<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div class="h-full w-full">
      <div
        class="flex h-full items-center justify-center px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="max-w-md flex-grow">
          <div class="w-full flex mb-4">
            <NuxtLink
              class="bg-white border p-3 rounded-lg transition-all ease-in-out hover:border-primary"
              to="/"
              ><IconsTest class="h-8 w-8 fill-primary"></IconsTest
            ></NuxtLink>
          </div>
          <div v-if="success" class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl font-medium">Congratulations</h1>
              <span v-if="success" class="text-green-500 text-xl w-full">{{
                success
              }}</span>
            </div>
            <p class="text-primary">
              Please go to login and type your brand new password.
            </p>
            <NuxtLink
              to="/login"
              class="focus:bg-primary mt-2 hover:bg-primary bg-primary block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
            >
              <div class="relative flex items-center justify-center">
                <div :class="{ hidden: sendingForm }">Sign In</div>
              </div>
            </NuxtLink>
          </div>
          <div v-else-if="!recoveryEmail" class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl font-medium">
                Ups... Your password reset link is broken
              </h1>
              <span
                v-if="validations.email"
                v-for="message in validations.email"
                class="text-red-500 text-xl w-full"
                >{{ message }}</span
              >
            </div>
            <p class="text-primary">
              Please re-check your email for the correct link or restart the
              process.
            </p>
            <NuxtLink
              to="/forgot-password"
              class="focus:bg-primary hover:bg-primary bg-primary block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
            >
              <div class="relative flex items-center justify-center">
                <div :class="{ hidden: sendingForm }">Restart process</div>
              </div>
            </NuxtLink>
          </div>
          <div v-else class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl font-medium">
                Set your new Password for {{ form.email }}
              </h1>
            </div>
            <p class="text-primary">
              Please use a password diferent to the previous one.
            </p>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label
                    for="password"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      Password
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-lg text-sm shadow-sm duration-200 mt-2"
                  >
                    <input
                      type="password"
                      name="password"
                      autocomplete="off"
                      v-model="form.password"
                      required=""
                      spellcheck="false"
                      placeholder="••••••••••"
                      class="block flex-grow rounded-r-md border disabled:opacity-60 py-2.5 px-2 text-sm rounded-lg"
                    />
                  </div>
                  <span
                    v-if="validations.password"
                    v-for="message in validations.password"
                    class="text-red-500 text-xs w-full"
                    >{{ message }}</span
                  >
                </div>
                <div class="w-full">
                  <label
                    for="password"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      Confirm Password
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-lg text-sm shadow-sm duration-200 mt-2"
                  >
                    <input
                      type="password"
                      name="password"
                      autocomplete="off"
                      v-model="form.password_confirmation"
                      required=""
                      spellcheck="false"
                      placeholder="••••••••••"
                      class="block flex-grow disabled:opacity-60 py-2.5 px-2 text-sm border rounded-lg"
                    />
                  </div>
                </div>
                <button
                  @click="resetPassword()"
                  class="mt-2 focus:bg-primary hover:bg-primary bg-primary block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
                  :disabled="sendingForm"
                >
                  <div class="relative flex items-center justify-center">
                    <div :class="{ hidden: sendingForm }">Send</div>
                    <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                  </div>
                </button>
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
      middleware: ["no-auth"],
    });
    const route = useRoute();
    const token = route.params.token;
    const recoveryEmail = route.query.email ? route.query.email : false;
    console.log(route.params.token, route.query.email);
    const authStore = useAuthStore();
    return { authStore, token, recoveryEmail };
  },
  data() {
    return {
      form: {
        email: this.recoveryEmail,
        password: "TESTTESTTEST",
        password_confirmation: "TESTTESTTEST",
      },
      validations: [],
      sendingForm: false,
      success: false,
    };
  },
  methods: {
    async resetPassword() {
      this.sendingForm = true;
      const credentials = {
        token: this.token,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password,
      };
      var response = await this.authStore.resetPassword(credentials);
      console.log(response);
      this.resetErrors();
      if (response.data && response.data.status) {
        this.success = response.data.status;
        //   navigateTo("/");
      } else {
        this.validations = response.errors;
        if (
          response.errors?.email[0] ==
            "We can't find a user with that email address." ||
          response.errors?.email[0] == "This password reset token is invalid."
        ) {
          this.recoveryEmail = false;
        }
      }
      this.sendingForm = false;
    },
    resetErrors() {
      this.validations = [];
    },
  },
};
</script>
