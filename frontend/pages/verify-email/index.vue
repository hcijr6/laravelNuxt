<template>
  <div class="grid min-h-screen md:grid-cols-2 dark-theme">
    <div class="w-full h-full bg-primary-foreground">
      <div
        class="flex items-center justify-center h-full px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="flex-grow max-w-md">
          <div class="flex w-full mb-4">
            <UiButton variant="outline" size="logoXl" to-link="/"
              ><SvgLogo class="w-8 h-8"></SvgLogo
            ></UiButton>
          </div>
          <div
            v-if="!authStore.user.email_verified_at"
            class="flex flex-col w-full gap-2 mt-4"
          >
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl font-medium text-primary">
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
                <UiButton
                  :disabled="sendingForm || lockedButton"
                  @click="sendEmail"
                >
                  <div v-if="!timer" :class="{ hidden: sendingForm }">
                    Send again
                  </div>
                  <div v-else>Sended, wait for resending {{ timer }}</div>
                  <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                </UiButton>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col w-full gap-2 mt-4">
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl font-medium text-primary">
                Congratulations!
              </h1>
            </div>
            <p slot="description" class="text-primary">
              You're email account has been verified. Continue your navigation
              through our web.
            </p>
            <div class="flex flex-col gap-4 mt-4">
              <div class="flex flex-col gap-4">
                <UiButton to-link="/profile/email" ¡> Start </UiButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ThemeAuthPattern></ThemeAuthPattern>
  </div>
</template>

<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    });
    useHead({
      title: "Verify Email",
      meta: [
        {
          name: "description",
          content:
            "Streamline your web development with our cutting-edge template designed for Laravel 10 and Nuxt 3 . Save precious time and maximize your productivity with our sophisticated, turnkey solution designed by expert developers.Actual middleware: Guest",
        },
      ],
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
  mounted() {
    this.authStore.fetchCurrentUser();
  },
  methods: {
    async sendEmail() {
      this.sendingForm = true;
      const response = await this.authStore.sendEmailNotification();
      if (response && response.status == "verification-link-sent") {
        // console.log(new Date());
        let nextVerification = new Date();
        nextVerification.setSeconds(nextVerification.getSeconds() + 100);
        nextVerification = nextVerification.getTime();
        this.authStore.nextVerification = nextVerification;
        await this.setCounter();
      }
      this.sendingForm = false;
    },
    async setCounter() {
      if (this.authStore.nextVerification) {
        const nextVerification = this.authStore.nextVerification;
        this.lockedButton = true;
        var x = setInterval(() => {
          const start = new Date().getTime();
          const distance = nextVerification - start;
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
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
      const minutosStr = minutos < 10 ? "0" + minutos : minutos;
      const segundosStr = segundos < 10 ? "0" + segundos : segundos;
      return minutosStr + ":" + segundosStr;
    },
  },
};
</script>
