import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  var sessionAuthorized = await authStore.checkIfSessionAuthorized();
  console.log(sessionAuthorized)
  if (!sessionAuthorized) {
      return navigateTo("/login", { replace: true });
  } 
});
