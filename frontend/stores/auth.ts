import { defineStore } from "pinia";
type User = {
  name: string;
  email?: string;
  permission: string;
  email_verified_at: string;
};
export const useAuthStore = defineStore("auth_store", {
  state: () => ({
    user: null,
    forgotPasswordEmail:null
  }),
  actions: {
    async login(credentials: object) {
      var petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/login", petition));
    },
    async register(credentials: object, redirect = false) {
      var petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/register", petition));
    },
    async forgotPassword(credentials: object) {
      var petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/forgot-password", petition));
    },
    async resetPassword(credentials: object) {
      var petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/reset-password", petition));
    },
    async checkIfSessionAuthorized() {
      try {
        var response: any = await $larafetch("/api/v1/user", {
          response: true,
        });
        console.log(response)
        this.user = response;
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout() {
      if (!this.isLoggedIn) return false;
      try {
        var response: any = await $larafetch("/logout", { method: "post" });
        this.user = null;
        location.reload();
      } catch (error) {
        return false;
      }
    },
  },
  getters: {
    isLoggedIn: function (state) {
      if (state.user && state.user?.name) {
        return true;
      } else {
        return false;
      }
    },
  },
});
