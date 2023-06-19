<template>
  <div class="container text-center py-28">
    <h1
      class="max-w-4xl mx-auto text-5xl font-medium tracking-tight text-primary sm:text-7xl"
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
      <UiButton variant="outline" to-link="/profile"> Profile Page </UiButton>
      <UiButton v-if="authStore.isLoggedIn" @click="logout()">
        Logout
      </UiButton>
      <UiButton v-else to-link="/login"> Login </UiButton>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    definePageMeta({
      layout: "main-layout",
      middleware: ["guest"],
    });
    useHead({
      title: this.$t("index.metaTitle"),
      meta: [
        {
          name: "description",
          content: this.$t("index.metaDescription"),
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
    async test() {
      const response = await $larafetch("/api/v1/user", {
        response: true,
        redirectIfNotAuthenticated: true,
      });
      console.log(response);
    },
  },
};
</script>
