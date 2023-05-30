import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
      var user = await authStore.fetchCurrentUser()
      if(!user){
        return navigateTo("/login", { replace: true });
      }
  } 
});
