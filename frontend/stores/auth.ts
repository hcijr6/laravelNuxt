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
    forgotPasswordEmail: null,
    nextVerification: null,
  }),

  actions: {
    // Log in with provided credentials
    async login(credentials: object) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/login", petition));
    },

    // Register a new user with provided credentials
    async register(credentials: object, redirect = false) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/register", petition));
    },

    // Send a forgot password request with provided credentials
    async forgotPassword(credentials: object) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/forgot-password", petition));
    },

    // Reset password with provided credentials
    async resetPassword(credentials: object) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/reset-password", petition));
    },

    // Fetch the currently logged in user's data
    async fetchCurrentUser(redirect = false) {
      try {
        const response: any = await $larafetch("/api/v1/user", {
          response: true,
        });
        this.user = response;
        return true;
      } catch (error) {
        return false;
      }
    },

    // Send email verification notification
    async sendEmailNotification() {
      try {
        const response: any = await $larafetch(
          "/email/verification-notification",
          {
            response: true,
            method: "post",
          }
        );
        return response;
      } catch (error) {
        return false;
      }
    },

    // Log out the user, optionally redirecting to login if required middlewares are present
    async logout(middlewares = false) {
      if (!this.isLoggedIn) return false;
      try {
        await $larafetch("/logout", { method: "post" });
        this.user = null;
        if (middlewares && Array.isArray(middlewares)) {
          const requiredMiddlewares = new Set(["verified-email", "auth"]);
          const requiresAuth = middlewares.some((middleware) =>
            requiredMiddlewares.has(middleware)
          );
          if (requiresAuth) {
            await navigateTo(testLocale("/login"));
          }
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  getters: {
    // Check if the user is logged in
    isLoggedIn: function (state) {
      if (state.user && state.user?.name) {
        return true;
      } else {
        return false;
      }
    },
  },
});
