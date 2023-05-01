<template>
  <div
    class="min-w-screen min-h-screen flex flex-col justify-start items-center"
  >
    <header class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-2 bg-white border-b">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink class="bg-white border p-2 rounded-lg  transition-all ease-in-out hover:border-gray-800" to="/"><IconsTest class="h-6 w-6 fill-gray-800"></IconsTest></NuxtLink>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block"> 
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
          </div>
        </div>
      </nav>
    </header>
    <slot />
  </div>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
import { VariableIcon } from "@heroicons/vue/24/solid"

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components:{
    VariableIcon
  },
  methods: {
    async logout() {
      var response = await this.authStore.logout();
    },
  },
};
</script>
