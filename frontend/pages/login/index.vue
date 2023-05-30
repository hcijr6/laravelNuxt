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
          <div class="flex flex-col w-full gap-2 mt-4">
            <div class="text-2xl font-medium">
              <!-- <HelloWorld></HelloWorld> -->
              <h1 slot="header" class="text-2xl font-medium">Welcome to Hex</h1>
            </div>
            <p slot="description" class="text-primary">
              Hex helps you start building, managing and sharing your Nuxt App
              in minutes, not days.
            </p>
            <div class="flex flex-col gap-4 mt-4">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label
                    for="email"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      Email
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm"
                  >
                    <input
                      type="text"
                      name="mail"
                      autocomplete="off"
                      v-model.lazy="form.email"
                      @change="handleInput('email', form.email)"
                      required=""
                      spellcheck="false"
                      placeholder="Enter your email"
                      class="block flex-grow rounded-r-md border disabled:opacity-60 py-2.5 px-2 text-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                    />
                  </div>
                  <span
                    v-if="validations.email"
                    v-for="message in validations.email"
                    class="w-full text-xs text-red-500"
                    >{{ message }}</span
                  >
                </div>
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
                    class="flex w-full mt-2 text-sm duration-200 rounded-lg shadow-sm"
                  >
                    <input
                      type="password"
                      name="password"
                      autocomplete="off"
                      v-model.lazy="form.password"
                      @change="handleInput('password', form.password)"
                      required=""
                      spellcheck="false"
                      placeholder="••••••••••"
                      class="block flex-grow rounded-r-md border disabled:opacity-60 py-2.5 px-2 text-sm border-gray-300 rounded-lg"
                    />
                  </div>
                  <span
                    v-if="validations.password"
                    v-for="message in validations.password"
                    class="w-full text-xs text-red-500"
                    >{{ message }}</span
                  >
                  <div class="mt-1 text-sm text-primary">
                    <span
                      class="font-medium underline cursor-pointer text-primary"
                      @click="forgotPassword"
                      >Forgot Password?</span
                    >
                  </div>
                </div>
                <button
                  @click="thisLogin"
                  :disabled="sendingForm"
                  class="mt-2 bg-primary focus:bg-primary hover:bg-primary bg-primary block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
                >
                  <div class="relative flex items-center justify-center">
                    <div :class="{ hidden: sendingForm }">Sign In</div>
                    <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                  </div>
                </button>
                <div class="flex">
                  <div class="text-sm text-primary">
                    You don't have an account?
                    <NuxtLink
                      class="font-medium underline text-primary"
                      to="/register"
                      >Sign up
                    </NuxtLink>
                  </div>
                </div>
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
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      form: {
        email: "hcijr6@gmail.com",
        password: "hcijr6@gmail.com",
      },
      validations: [],
      sendingForm: false,
      className: "Auth\\LoginRequest",
      validationSource: "Request",
    };
  },
  methods: {
    async forgotPassword() {
      this.authStore.forgotPasswordEmail = this.form.email;
      navigateTo("/forgot-password");
    },
    async thisLogin() {
      this.sendingForm = true;
      const credentials = {
        email: this.form.email,
        password: this.form.password,
      };
      var response = await this.authStore.login(credentials);
      resetErrors(this);
      if (response.data) {
        this.authStore.user = response.data;
        navigateTo("/");
      } else {
        this.validations = response.errors;
      }
      this.sendingForm = false;
    },
    async handleInput(field, data) {
      this.sendingForm = true;
      checkSingleField(this, field, data);
      this.sendingForm = false;
    },
  },
};
</script>
