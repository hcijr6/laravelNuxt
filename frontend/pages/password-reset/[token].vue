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
                {{ $t("passwordReset.success.title") }}
              </h1>
              <span v-if="success" class="text-green-500 text-xl w-full">{{
                success
              }}</span>
            </div>
            <p class="text-primary">
              {{ $t("passwordReset.success.description") }}
            </p>
            <UiButton to-link="/login">
              <div class="relative flex items-center justify-center">
                <div :class="{ hidden: sendingForm }">
                  {{ $t("global.auth.signIn") }}
                </div>
              </div>
            </UiButton>
          </div>
          <div v-else-if="!recoveryEmail" class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl font-medium text-primary">
                {{ $t("passwordReset.errorMail.title") }}
              </h1>
              <span
                v-for="message in validations.email"
                v-if="validations.email"
                class="text-red-500 text-xl w-full"
                >{{ message }}</span
              >
            </div>
            <p class="text-primary">
              {{ $t("passwordReset.errorMail.description") }}
            </p>
            <UiButton to-link="/forgot-password">
              <div :class="{ hidden: sendingForm }">
                {{ $t("passwordReset.errorMail.action") }}
              </div>
            </UiButton>
          </div>
          <div v-else class="flex w-full flex-col gap-2">
            <div class="text-2xl font-medium">
              <h1 class="text-2xl text-primary font-medium">
                {{ $t("passwordReset.regular.title", { email: form.email }) }}
              </h1>
            </div>
            <p class="text-primary">
              {{ $t("passwordReset.regular.description") }}
            </p>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label
                    for="password"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      {{ $t("global.forms.password.label") }}
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-lg text-sm shadow-sm duration-200 mt-2"
                  >
                    <UiInput
                      v-model="form.password"
                      type="password"
                      name="password"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      :placeholder="$t('global.forms.password.placeholder')"
                    />
                  </div>
                  <span
                    v-for="message in validations.password"
                    v-if="validations.password"
                    class="text-red-500 text-xs w-full"
                    >{{ message }}</span
                  >
                </div>
                <div class="w-full">
                  <label
                    for="password"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      {{ $t("global.forms.passwordConfirmation.label") }}
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full rounded-lg text-sm shadow-sm duration-200 mt-2"
                  >
                    <UiInput
                      v-model="form.password_confirmation"
                      type="password"
                      name="password"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      :placeholder="
                        $t('global.forms.passwordConfirmation.placeholder')
                      "
                    />
                  </div>
                </div>
                <UiButton :disabled="sendingForm" @click="resetPassword()">
                  <div :class="{ hidden: sendingForm }">
                    {{ $t("global.send") }}
                  </div>
                  <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                </UiButton>
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
      title: "Password Reset",
    });
    const route = useRoute();
    const token = route.params.token;
    const recoveryEmail = route.query.email ? route.query.email : false;
    // console.log(route.params.token, route.query.email);
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
      const response = await this.authStore.resetPassword(credentials);
      // console.log(response);
      this.resetErrors();
      if (response.data && response.data.status) {
        this.success = response.data.status;
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
