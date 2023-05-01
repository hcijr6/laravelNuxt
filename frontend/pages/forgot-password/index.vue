<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div class="h-full w-full">
      <div
        class="flex h-full items-center justify-center px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="max-w-md flex-grow">
          <div class="w-full flex mb-4">
            <NuxtLink class="bg-white border p-3 rounded-lg  transition-all ease-in-out hover:border-gray-800 " to="/"><IconsTest class="h-8 w-8 fill-gray-800"></IconsTest></NuxtLink>
          </div>
          <div v-if="success" class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl font-medium">Success</h1>
              <span v-if="success" class="text-green-500 text-xl w-full">{{
                success
              }}</span>
            </div>
            <p class="text-gray-800">
              Please go check your {{ authStore.forgotPasswordEmail }} mail.
            </p>
            
          </div>
          <div v-else class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <!-- <HelloWorld></HelloWorld> -->
              <h1 slot="header" class="text-2xl font-medium">
                You forget your password?
              </h1>
            </div>
            <p slot="description" class="text-gray-800">
              Let us help you with that.
            </p>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex flex-col gap-4">
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
                      v-model="authStore.forgotPasswordEmail"
                      required=""
                      spellcheck="false"
                      placeholder="Enter your email"
                      class="block flex-grow rounded-r-md border disabled:opacity-60 py-2.5 px-2 text-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                    />
                  </div>
                  <span
                    v-if="validations.email"
                    v-for="message in validations.email"
                    class="text-red-500 text-xs w-full"
                    >{{ message }}</span
                  >
                </div>

                <button
                  @click="forgotPassword"
                  :disabled="sendingForm"
                  class="bg-primary focus:bg-gray-800 hover:bg-gray-800 bg-gray-800 block appearance-none rounded-lg text-sm font-medium text-white duration-100 focus:outline-none disabled:pointer-events-none px-4 py-2.5"
                >
                  <div class="relative flex items-center justify-center">
                    <div :class="{ hidden: sendingForm }">Send link</div>
                    <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                  </div>
                </button>
                <div class="flex flex-col">
                  <div class="text-sm text-gray-800">
                    You don't have an account?
                    <NuxtLink
                      class="text-primary font-medium underline"
                      to="/register"
                      >Sign up
                    </NuxtLink>
                  </div>
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
        email: "hcijr6@gmail.com",
        password: "hcijr6@gmail.com",
      },
      validations: [],
      sendingForm: false,
      success:false
    };
  },
  methods: {
    async forgotPassword() {
      this.sendingForm = true;
      const credentials = {
        email: this.authStore.forgotPasswordEmail,
      };
      var response = await this.authStore.forgotPassword(credentials);
      console.log(response);
      this.resetErrors();
      if (response.data) {
        if(response.data.status){
          this.success=response.data.status;
        }
        // this.authStore.user = response.data;
        // navigateTo("/");
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
