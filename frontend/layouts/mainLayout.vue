<template>
  <div
    class="flex flex-col items-center justify-start min-h-screen min-w-screen bg-background ark"
  >
    <header class="py-2 border-b border-input container">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <UiButton size="logo" variant="outline" toLink="/">
            <IconsTest class="w-7 h-7 fill-primary"></IconsTest>
          </UiButton>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="">
            <div v-if="authStore.isLoggedIn" class="flex gap-2">
              <UiButton size="logo" variant="outline" toLink="/profile">
                <span class="h-5 w-5 text-center">{{ authStore.user?.name.charAt(0) }}</span>
              </UiButton>
              <UiButton @click="logout()">Logout</UiButton>
            </div>
            <UiButton toLink="/login" v-else>
              Login
            </UiButton>
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