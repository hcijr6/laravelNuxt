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
                {{ $t("register.title") }}
              </h1>
            </div>
            <p slot="description" class="text-primary">
              {{ $t("register.description") }}
            </p>
            <div class="flex flex-col gap-4 mt-4">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label
                    for="name"
                    class="block text-sm font-medium text-primary"
                    ><div class="flex items-center gap-2">
                      {{ $t("global.forms.name.label") }}
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm"
                  >
                    <UiInput
                      v-model="form.name"
                      type="text"
                      name="name"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      :placeholder="$t('global.forms.name.placeholder')"
                      @change="handleInput('name', form.name)"
                    />
                  </div>
                  <UiInputErrors
                    v-if="validations.name"
                    :errors="validations.name"
                  ></UiInputErrors>
                </div>
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
                    class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm"
                  >
                    <UiInput
                      v-model="form.email"
                      type="text"
                      name="mail"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      :placeholder="$t('global.forms.email.placeholder')"
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
                      {{ $t("global.forms.password.label") }}
                      <div></div>
                    </div>
                  </label>
                  <div
                    class="flex w-full mt-2 text-sm duration-200 rounded-lg shadow-sm"
                  >
                    <UiInput
                      v-model="form.password"
                      type="password"
                      name="password"
                      autocomplete="off"
                      required=""
                      spellcheck="false"
                      :placeholder="$t('global.forms.password.placeholder')"
                      @change="handleInput('password', form.password)"
                    />
                  </div>
                  <UiInputErrors
                    v-if="validations.password"
                    :errors="validations.password"
                  ></UiInputErrors>
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
                    class="flex w-full mt-2 text-sm duration-200 rounded-lg shadow-sm"
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
                <UiButton :disabled="sendingForm" @click="register()">
                  <div class="relative flex items-center justify-center">
                    <div :class="{ hidden: sendingForm }">
                      {{ $t("global.auth.signUp") }}
                    </div>
                    <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                  </div>
                </UiButton>
                <div class="text-sm text-primary">
                  {{ $t("global.auth.loginQuestion") }}
                  <NuxtLink
                    class="font-medium underline text-primary"
                    :to="localePath('/login')"
                    >{{ $t("global.auth.signIn") }}</NuxtLink
                  >
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
      title: "Register",
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
        name: "Hernán",
        email: "hcijr6@gmail.com",
        password: "hcijr6@gmail.com",
        password_confirmation: "hcijr6@gmail.com",
      },
      validations: [],
      sendingForm: false,
      className: "Auth\\RegisterRequest",
      validationSource: "Request",
    };
  },
  methods: {
    async register() {
      this.sendingForm = true;
      const credentials = {
        name: this.form.email,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
      };
      const response = await this.authStore.register(credentials);
      this.resetErrors();
      if (response.data) {
        this.authStore.user = response.data;
        navigateTo(testLocale("/"));
      } else {
        this.validations = response.errors;
      }
      this.sendingForm = false;
    },
    resetErrors() {
      this.validations = [];
    },
    async handleInput(field, data) {
      this.sendingForm = true;
      checkSingleField(this, field, data);
      this.sendingForm = false;
    },
  },
};
</script>
