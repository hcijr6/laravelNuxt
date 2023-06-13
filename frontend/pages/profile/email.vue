<template>
  <div
    class="px-4 pt-20 pb-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:pt-32"
  >
    <h1
      class="max-w-4xl mx-auto text-5xl font-medium tracking-tight text-primary sm:text-7xl"
    >
      Private page that requires an verified email.
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
      Actual middleware: verifiedEmail
    </p>
    <div class="flex justify-center gap-3 mt-10">
      <UiButton variant="outline" toLink="/">Home</UiButton>
      <UiButton toLink="/profile">Profile Page</UiButton>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    definePageMeta({
      layout: "main-layout",
      middleware: ["verified-email"],
    });
    useHead({
      title: "Verified Email",
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
  methods: {
    async logout() {
      var response = await this.authStore.logout();
    },
  },
};
</script>
