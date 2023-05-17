<template>
  <div
    class="px-4 pt-20 pb-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:pt-32"
  >
    <h1
      class="max-w-4xl mx-auto text-5xl font-medium tracking-tight text-gray-800 sm:text-7xl"
    >
      Public
      <span class="relative"
        ><span class="mx-5 underline">Home Page</span></span
      >
      that requires no auth.
    </h1>
    <p class="max-w-2xl mx-auto mt-6 text-lg tracking-tight text-slate-700">
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
      class="max-w-2xl mx-auto mt-6 text-lg font-semibold tracking-tight text-slate-700"
    >
      Actual middleware: Guest
    </p>
    <div class="flex justify-center mt-10 gap-x-6">
      <button
        v-if="authStore.isLoggedIn"
        @click="logout()"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
      >
        Logout
      </button>
      <NuxtLink
        v-else
        to="/login"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
      >
        Login
      </NuxtLink>

      <NuxtLink
        to="/profile"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-800 transition-all ease-in-out border rounded-lg group hover:border-gray-800"
      >
        Profile Page
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
      middleware: ["guest"],
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
