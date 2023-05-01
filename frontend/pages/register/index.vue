<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div class="h-full w-full">
      <div
        class="flex h-full items-center justify-center px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="max-w-md flex-grow">
          <div class="w-full flex mb-4">
            <NuxtLink
              class="bg-white border p-3 rounded-lg transition-all ease-in-out hover:border-gray-800"
              to="/"
              ><IconsTest class="h-8 w-8 fill-gray-800"></IconsTest
            ></NuxtLink>
          </div>
          <div class="mt-4 flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl font-medium">Welcome to Hex</h1>
            </div>
            <p slot="description" class="text-gray-800">
              Hex helps you start building, managing and sharing your Nuxt App
              in minutes, not days.
            </p>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-800"
                    ><div class="flex items-center gap-2">
                      Name
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-md text-sm shadow-sm duration-200 mt-2"
                  >
                    <input
                      type="text"
                      name="name"
                      autocomplete="off"
                      v-model="form.name"
                      required=""
                      spellcheck="false"
                      placeholder="Enter your name"
                      class="block flex-grow rounded-r-md border disabled:opacity-60 py-2.5 px-2 text-sm focus:ring-primary focus:border-primary rounded-md"
                    />
                  </div>
                  <span
                    v-if="validations.name"
                    v-for="message in validations.name"
                    class="text-red-500 text-xs w-full"
                    >{{ message }}</span
                  >
                </div>
                <div class="w-full">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-800"
                    ><div class="flex items-center gap-2">
                      Email
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-md text-sm shadow-sm duration-200 mt-2"
                  >
                    <input
                      type="text"
                      name="mail"
                      autocomplete="off"
                      v-model="form.email"
                      required=""
                      spellcheck="false"
                      placeholder="Enter your email"
                      class="block flex-grow rounded-r-md border disabled:opacity-60 py-2.5 px-2 text-sm focus:ring-primary focus:border-primary rounded-md"
                    />
                  </div>
                  <span
                    v-if="validations.email"
                    v-for="message in validations.email"
                    class="text-red-500 text-xs w-full"
                    >{{ message }}</span
                  >
                </div>
                <div class="w-full">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-800"
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
                    class="block text-sm font-medium text-gray-800"
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
                  @click="register()"
                  class="mt-2 focus:bg-gray-800 hover:bg-gray-800 bg-gray-800 block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
                  :disabled="sendingForm"
                >
                  <div class="relative flex items-center justify-center">
                    <div :class="{ hidden: sendingForm }">Sign Up</div>
                    <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                  </div>
                </button>
                <div class="text-sm text-gray-800">
                  Already have an account?
                  <NuxtLink
                    class="text-primary font-medium underline"
                    to="/login"
                    >Sign In</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-800"></div>
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
        name: "Hernán",
        email: "hcijr6@gmail.com",
        password: "hcijr6@gmail.com",
        password_confirmation: "hcijr6@gmail.com",
      },
      validations: [],
      sendingForm: false,
    };
  },
  methods: {
    async register() {
      this.sendingForm = true;
      const credentials = {
        name: this.form.email,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password,
      };
      var response = await this.authStore.register(credentials);
      this.resetErrors();
      if (response.data) {
        this.authStore.user = response.data;
        navigateTo("/");
      } else {
        this.validations = response.errors;
      }
      this.sendingForm = false;
    },
    resetErrors() {
      this.validations = [];
    },
  },
};
</script>
