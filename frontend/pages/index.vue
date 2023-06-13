<template>
  <div class="container text-center py-28">
    <h1
      class="max-w-4xl mx-auto text-5xl font-medium tracking-tight text-primary sm:text-7xl"
    >
      Public
      <span class="relative"><span class="underline">Home Page</span></span>
      that requires no auth.
    </h1>
    <p class="max-w-2xl mx-auto mt-6 text-lg tracking-tight text-primary">
      Streamline your web development with our cutting-edge template designed
      for
      <a
        href="https://laravel.com/"
        class="font-semibold text-[#FF2D20] underline"
        >Laravel 10</a
      >
      and
      <a href="https://nuxt.com/" class="font-semibold text-[#00DC82] underline"
        >Nuxt 3</a
      >
      . Save precious time and maximize your productivity with our
      sophisticated, turnkey solution designed by expert developers.
    </p>
    <p
      class="max-w-2xl mx-auto mt-6 text-lg font-semibold tracking-tight text-primary"
    >
      Actual middleware: Guest
    </p>
    <div class="flex justify-center gap-3 mt-10">
      <UiButton variant="outline" toLink="/profile"> Profile Page </UiButton>
      <UiButton v-if="authStore.isLoggedIn" @click="logout()">
        Logout
      </UiButton>
      <UiButton v-else toLink="/login"> Login </UiButton>
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
      title: "Home Page",
      meta: [
        {
          name: "description",
          content: "Streamline your web development with our cutting-edge template designed for Laravel 10 and Nuxt 3 . Save precious time and maximize your productivity with our sophisticated, turnkey solution designed by expert developers.Actual middleware: Guest",
        },
      ],
    });
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async logout() {
      var response = await this.authStore.logout();
    },
    async test() {
      var response = await $larafetch("/api/v1/user", {
        response: true,
        redirectIfNotAuthenticated: true,
      });
      console.log(response);
    },
  },
};
</script>
