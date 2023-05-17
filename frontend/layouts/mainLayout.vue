<template>
  <div
    class="flex flex-col items-center justify-start min-h-screen min-w-screen"
  >
    <header
      class="w-full px-4 py-2 mx-auto bg-white border-b max-w-7xl sm:px-6 lg:px-8"
    >
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink
            class="p-2 transition-all ease-in-out bg-white border rounded-lg hover:border-gray-800"
            to="/"
            ><IconsTest class="w-6 h-6 fill-gray-800"></IconsTest
          ></NuxtLink>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="">
            <div v-if="authStore.isLoggedIn" class="flex gap-2">
              <NuxtLink
                to="/profile"
                class="inline-flex items-center justify-center px-[0.75em] py-1 text-base font-semibold transition-all ease-in-out bg-white border rounded-lg hover:border-gray-800"
              >
                <span>{{ authStore.user?.name.charAt(0) }}</span>
              </NuxtLink>
              <button
                @click="logout()"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
              >
                Logout
              </button>
            </div>
            <NuxtLink
              v-else
              to="/login"
              class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            >
              Login
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    <slot />
  </div>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
import { VariableIcon } from "@heroicons/vue/24/solid";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components: {
    VariableIcon,
  },
  methods: {
    async logout() {
      var response = await this.authStore.logout();
    },
  },
};
</script>
