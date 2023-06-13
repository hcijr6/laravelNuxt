<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div class="w-full h-full bg-primary-foreground">
      <div
        class="flex items-center justify-center h-full px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="flex-grow max-w-md">
          <div class="flex w-full mb-4">
            <UiButton size="logoXl" variant="invertSolid" to-link="/">
              <SvgLogo class="w-8 h-8"></SvgLogo>
            </UiButton>
          </div>
          <div class="flex flex-col w-full gap-2 mt-4">
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl text-primary font-medium">
                Welcome to HCI
              </h1>
            </div>
            <p slot="description" class="text-primary">
              HCI helps you start building, managing and sharing your Nuxt App
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
                    <UiInput
                      v-model.lazy="form.email"
                      type="text"
                      name="mail"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      placeholder="Enter your email"
                      @change="handleInput('email', form.email)"
                    />
                  </div>
                  <UiInputErrors
                    v-if="validations.email"
                    :errors="validations.email"
                  ></UiInputErrors>
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
                    <UiInput
                      v-model.lazy="form.password"
                      type="password"
                      name="password"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      placeholder="••••••••••"
                      @change="handleInput('password', form.password)"
                    />
                  </div>
                  <UiInputErrors
                    v-if="validations.password"
                    :errors="validations.password"
                  ></UiInputErrors>
                  <div class="mt-1 text-sm text-primary">
                    <span
                      class="font-medium underline cursor-pointer text-primary"
                      @click="forgotPassword"
                      >Forgot Password?</span
                    >
                  </div>
                </div>

                <UiButton :disabled="sendingForm" @click="thisLogin">
                  <div :class="{ hidden: sendingForm }">Sign In</div>
                  <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                </UiButton>
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
                <ThemeSwitchMode></ThemeSwitchMode>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-slate-900"></div>
  </div>
</template>

<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    definePageMeta({
      middleware: ["no-auth"],
    });
    useHead({
      title: "Login",
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
      const response = await this.authStore.login(credentials);
      resetErrors(this);
      if (response.data) {
        this.authStore.user = response.data;
        navigateTo("/");
      } else {
        this.validations = response.errors;
        this.sendingForm = false;
      }
    },
    async handleInput(field, data) {
      this.sendingForm = true;
      await checkSingleField(this, field, data);
      this.sendingForm = false;
    },
  },
};
</script>
