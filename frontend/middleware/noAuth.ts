import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) {
    return navigateTo(testLocale("/"));
  }
});
