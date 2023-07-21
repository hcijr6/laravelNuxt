import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
 if (!authStore.user || !authStore.user.email_verified_at) {
    return navigateTo(testLocale("/verify-email"));
  }
});
