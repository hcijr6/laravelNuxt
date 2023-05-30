import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    var response = await authStore.fetchCurrentUser(true);
    if(response){
      return navigateTo('/login',{replace:true});
    }
  } else if (!authStore.user.email_verified_at) {
    return navigateTo("/verify-email", { replace: true });
  }
});
