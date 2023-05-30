<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div class="w-full h-full">
      <div
        class="flex items-center justify-center h-full px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="flex-grow max-w-md">
          <div class="flex w-full mb-4">
            <NuxtLink
              class="p-3 transition-all ease-in-out bg-white border rounded-lg hover:border-primary"
              to="/"
              ><IconsTest class="w-8 h-8 fill-primary"></IconsTest
            ></NuxtLink>
          </div>
          <div
            class="flex flex-col w-full gap-2 mt-4"
            v-if="!authStore.user.email_verified_at"
          >
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl font-medium">
                Verify your email: {{ authStore.user.email }}
              </h1>
            </div>
            <p slot="description" class="text-primary">
              We have sent you a message to verify your email account.
              <br /><br />
              Check your inbox and spam folder. If you do not receive it, click
              on the following button to resend it to you.
            </p>
            <div class="flex flex-col gap-4 mt-4">
              <div class="flex flex-col gap-4">
                <button
                  @click="sendEmail"
                  :disabled="sendingForm || lockedButton"
                  class="mt-2 bg-primary focus:bg-primary hover:bg-primary bg-primary block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
                >
                  <div class="relative flex items-center justify-center">
                    <div v-if="!timer" :class="{ hidden: sendingForm }">
                      Send again
                    </div>
                    <div v-else>Sended, wait for resending {{ timer }}</div>
                    <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full gap-2 mt-4" v-else>
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl font-medium">
                Congratulations!
              </h1>
            </div>
            <p slot="description" class="text-primary">
              You're email account has been verified. Continue your navigation
              through our web.
            </p>
            <div class="flex flex-col gap-4 mt-4">
              <div class="flex flex-col gap-4">
                <NuxtLink
                  to="/profile/email"
                  class="mt-2 bg-primary focus:bg-primary hover:bg-primary bg-primary block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
                >
                  <div class="relative flex items-center justify-center">
                    <div>Start</div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary"></div>
  </div>
</template>

<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    });
    const authStore = useAuthStore();
    return { authStore };
  },

  data() {
    return {
      validations: [],
      sendingForm: false,
      lockedButton: false,
      timer: false,
    };
  },
  methods: {
    async sendEmail() {
      this.sendingForm = true;
      var response = await this.authStore.sendEmailNotification();
      if (response && response.status == "verification-link-sent") {
        // console.log(new Date());
        var nextVerification = new Date();
        nextVerification.setSeconds(nextVerification.getSeconds() + 100);
        nextVerification = nextVerification.getTime();
        this.authStore.nextVerification = nextVerification;
        await this.setCounter();
      }
      this.sendingForm = false;
    },
    async setCounter() {
      if (this.authStore.nextVerification) {
        var nextVerification = this.authStore.nextVerification;
        this.lockedButton = true;
        var x = setInterval(() => {
          var start = new Date().getTime();
          var distance = nextVerification - start;
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          this.timer = this.formatoTiempo(minutes, seconds);
          if (distance <= 0) {
            clearInterval(x);
            this.lockedButton = false;
            this.timer = false;
          }
        }, 1000);
      }
    },
    formatoTiempo(minutos, segundos) {
      var minutosStr = minutos < 10 ? "0" + minutos : minutos;
      var segundosStr = segundos < 10 ? "0" + segundos : segundos;
      return minutosStr + ":" + segundosStr;
    },
  },
  mounted() {
    this.authStore.fetchCurrentUser();
  },
};
</script>
