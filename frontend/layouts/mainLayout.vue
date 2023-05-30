<template>
  <div
    class="flex flex-col items-center justify-start min-h-screen min-w-screen bg-background"
    :class="{
      dark: darkTheme,
    }"
  >
    <header class="py-2 border-b border-input container">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <UiButton size="logo" variant="outline" toLink="/">
            <IconsTest class="w-7 h-7 fill-primary"></IconsTest>
          </UiButton>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="flex gap-2">
            <UiButton
              v-if="authStore.isLoggedIn"
              size="logo"
              variant="outline"
              toLink="/profile"
            >
              <span class="h-5 w-5 text-center">{{
                authStore.user?.name.charAt(0)
              }}</span>
            </UiButton>

            <UiButton v-if="authStore.isLoggedIn" @click="logout()"
              >Logout</UiButton
            >
            <UiButton v-else toLink="/login"> Login </UiButton>
            <UiButton
              @click="darkTheme = !darkTheme"
              variant="outline"
              size="logo"
            >
              <SunIcon v-if="darkTheme" class="h-5 w-5 text-center"></SunIcon>
              <MoonIcon v-else class="h-5 w-5 text-center"></MoonIcon>
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
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      darkTheme: true,
    };
  },
  components: {
    SunIcon,
    MoonIcon
  },
  methods: {
    async logout() {
      var response = await this.authStore.logout();
    },
  },
};
</script>
