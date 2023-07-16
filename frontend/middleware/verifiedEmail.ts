import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    const response = await authStore.fetchCurrentUser(true);
    if (response) {
      return navigateTo(testLocale("/login"));
    }
  } else if (!authStore.user.email_verified_at) {
    return navigateTo(testLocale("/verify-email"));
  }
});
