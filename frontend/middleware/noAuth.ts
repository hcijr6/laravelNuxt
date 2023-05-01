import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
    var sessionAuthorized = await authStore.checkIfSessionAuthorized();
    if (sessionAuthorized) {
      return navigateTo("/", { replace: true });
    } else {
      authStore.user = null;
    }
});
