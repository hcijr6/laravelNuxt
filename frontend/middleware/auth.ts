import { useAuthStore } from "~~/stores/auth";
export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    const user = await authStore.fetchCurrentUser();
    if (!user) {
      return navigateTo(testLocale("/login"));
    }
  }
});
