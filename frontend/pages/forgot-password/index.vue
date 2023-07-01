<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div class="h-full w-full bg-primary-foreground">
      <div
        class="flex h-full items-center justify-center px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
      >
        <div class="max-w-md flex-grow">
          <div class="w-full flex mb-4">
            <UiButton size="logoXl" variant="invertSolid" to-link="/">
              <SvgLogo class="w-8 h-8"></SvgLogo>
            </UiButton>
          </div>
          <div v-if="success" class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl font-medium text-primary">
                {{ $t("forgotPassword.success") }}
              </h1>
              <span v-if="success" class="text-green-500 text-xl w-full">{{
                success
              }}</span>
            </div>
            <p class="text-primary">
              {{
                $t("forgotPassword.successMessage", {
                  email: authStore.forgotPasswordEmail,
                })
              }}
            </p>
          </div>
          <div v-else class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 slot="header" class="text-2xl font-medium text-primary">
                {{ $t("forgotPassword.title") }}
              </h1>
            </div>
            <p slot="description" class="text-primary">
              {{ $t("forgotPassword.description") }}
            </p>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label
                    for="email"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      {{ $t("global.forms.email.label") }}
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-md text-sm shadow-sm duration-200 mt-2"
                  >
                    <UiInput
                      v-model="authStore.forgotPasswordEmail"
                      type="text"
                      name="mail"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      :placeholder="$t('global.forms.email.placeholder')"
                    />
                  </div>
                  <UiInputErrors
                    v-if="validations.email"
                    :errors="validations.email"
                  ></UiInputErrors>
                </div>

                <UiButton :disabled="sendingForm" @click="forgotPassword">
                  <div :class="{ hidden: sendingForm }">{{ $t("forgotPassword.sendLink") }}</div>
                  <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                </UiButton>
                <div class="flex flex-col">
                  <div class="text-sm text-primary">
                    {{ $t("global.auth.registerQuestion") }}
                    <NuxtLink
                      class="text-primary font-medium underline"
                      to="/register"
                      >{{ $t("global.auth.signUp") }}
                    </NuxtLink>
                  </div>
                  <div class="text-sm text-primary">
                    {{ $t("global.auth.loginQuestion") }}
                    <NuxtLink
                      class="text-primary font-medium underline"
                      to="/login"
                    >
                      {{ $t("global.auth.signIn") }}
                    </NuxtLink>
                  </div>
                </div>
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
      middleware: ["no-auth"],
    });
    useHead({
      title: "Forgot Password",
    });
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      form: {
        email: "hcijr6@gmail.com",
      },
      validations: [],
      sendingForm: false,
      success: false,
    };
  },
  methods: {
    async forgotPassword() {
      this.sendingForm = true;
      const credentials = {
        email: this.authStore.forgotPasswordEmail,
      };
      const response = await this.authStore.forgotPassword(credentials);
      console.log(response);
      this.resetErrors();
      if (response.data) {
        if (response.data.status) {
          this.success = response.data.status;
        }
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
