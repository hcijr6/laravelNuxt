import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  var response = authStore.checkPermissions("accessDashboard");
  if (response) {
  } else {
    return navigateTo("/");
  }
});
