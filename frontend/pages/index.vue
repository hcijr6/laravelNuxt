<template>
  <div
    class="container text-center min-h-[80vh] items-center justify-center flex flex-col "
  >
    <h1
      class="max-w-4xl mx-auto text-fluid-xl font-medium tracking-tight text-primary leading-none"
    >
      <span class="relative"
        ><span class="underline">{{ $t("index.title.0") }}</span></span
      >
      {{ $t("index.title.1") }}
    </h1>
    <p class="max-w-2xl mx-auto mt-6 text-lg tracking-tight text-primary">
      {{ $t("index.description.0") }}
      <a
        href="https://laravel.com/"
        class="font-semibold text-[#FF2D20] underline"
        >Laravel 10</a
      >
      {{ $t("index.description.1") }}
      <a href="https://nuxt.com/" class="font-semibold text-[#00DC82] underline"
        >Nuxt 3</a
      >
      {{ $t("index.description.2") }}
    </p>
    <p
      class="max-w-2xl mx-auto mt-6 text-lg font-semibold tracking-tight text-primary"
    >
      {{ $t("index.subDescription") }} Guest
    </p>
    <div class="flex justify-center gap-3 mt-10">
      <UiButton variant="outline" to-link="/profile">
        {{ $t("profile.index.pageName") }}
      </UiButton>
      <UiButton v-if="authStore.isLoggedIn" @click="logout()">
        {{ $t("global.logout") }}
      </UiButton>
      <UiButton v-else to-link="/login">
        {{ $t("global.login") }}
      </UiButton>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    const { t } = useI18n();
    definePageMeta({
      layout: "main-layout",
      middleware: ["guest"],
    });
    useHead({
      title: t("index.metaTitle"),
      meta: [
        {
          name: "description",
          content: t("index.metaDescription"),
        },
      ],
    });
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async logout() {
      const response = await this.authStore.logout(this.$route.meta.middleware);
    },
  },
};
</script>
