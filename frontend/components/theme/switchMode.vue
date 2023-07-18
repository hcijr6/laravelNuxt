<template>
  <UiButton variant="outline" size="logo" @click="toggleTheme()">
    <SunIcon v-if="userTheme == 'dark-theme'" class="h-5 w-5 text-center"></SunIcon>
    <MoonIcon v-else class="h-5 w-5 text-center"></MoonIcon>
  </UiButton>
</template>

<script>
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
export default {
  components: {
    SunIcon,
    MoonIcon,
  },
  data() {
    return {
      userTheme: "light-theme",
    };
  },
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },
    getTheme() {
      return localStorage.getItem("user-theme");
    },
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
