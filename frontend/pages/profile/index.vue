<template>
  <div
    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32"
  >
    <h1
      class="mx-auto max-w-4xl text-5xl font-medium tracking-tight text-gray-800 sm:text-7xl"
    >
      Private
      <span class="relative whitespace-nowrap"
        ><span class="mx-5 underline"
          >{{ authStore.user?.name }} </span
        ></span
      >
      page that requires auth.
    </h1>
    <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
      Streamline your web development with our cutting-edge template designed
      for Laravel 10 and Nuxt 3. Save precious time and maximize your
      productivity with our sophisticated, turnkey solution designed by expert
      developers.
    </p>
    <div class="mt-10 flex justify-center gap-x-6">
      <button
        v-if="authStore.isLoggedIn"
        @click="logout()"
        class="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
      >
        Logout
      </button>
      <NuxtLink
        v-else
        to="/login"
        class="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
      >
        Login
      </NuxtLink>

      <NuxtLink
        to="/"
        class="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold transition-all ease-in-out border hover:border-gray-800 text-gray-800"
      >
        Home Page
      </NuxtLink>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    definePageMeta({
      layout: "main-layout",
      middleware: ["auth"],
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
