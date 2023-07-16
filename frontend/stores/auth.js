import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth_store", {
  state: () => ({
    user: null,
    forgotPasswordEmail: null,
    nextVerification: null,
  }),

  actions: {
    // Log in with provided credentials
    async login(credentials) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/login", petition));
    },

    // Register a new user with provided credentials
    async register(credentials, redirect = false) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/register", petition));
    },
    checkPermissions(requiredPermissions) {
      if (!this.user || !this.user.all_permissions || !Array.isArray(this.user.all_permissions)) {
        return false; // Si el usuario no tiene permisos o no es válido, retorna falso
      }
      // Si se proporciona una cadena de texto en lugar de un array, conviértelo en un array
      if (typeof requiredPermissions === 'string') {
        requiredPermissions = [requiredPermissions];
      }
      // Verifica si el usuario tiene todos los permisos requeridos
      return requiredPermissions.every(permission => this.user.all_permissions.includes(permission));
    },
    checkRole(requiredRoles) {
      if (!this.user || !this.user.roles || !Array.isArray(this.user.roles)) {
        return false; // Si el usuario no tiene permisos o no es válido, retorna falso
      }
      // Si se proporciona una cadena de texto en lugar de un array, conviértelo en un array
      if (typeof requiredRoles === 'string') {
        requiredRoles = [requiredRoles];
      }
      // Verifica si el usuario tiene todos los permisos requeridos
      return requiredRoles.every(role => this.user.roles.includes(role));
    },
    // Send a forgot password request with provided credentials
    async forgotPassword(credentials) {
      const petition = {
        response: true,
        method: "post",
        body: credentials,
      };
      return await submitRequest($larafetch("/forgot-password", petition));
    },

    // Reset password with provided credentials
    async resetPassword(credentials) {
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
        const response = await $larafetch("/api/v1/user", {
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
        const response = await $larafetch(
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
    hasPermission: (state) => (permission) => {
      return (
        state.user &&
        Array.isArray(state.user.permissions) &&
        state.user.permissions.length > 0 &&
        state.user.permissions.some(
          (userPermission) => userPermission.name === permission
        )
      );
    },

    hasRole: (state) => (role) => {
      return (
        state.user &&
        Array.isArray(state.user.roles) &&
        state.user.roles.length > 0 &&
        state.user.roles.some((userRole) => userRole.name === role)
      );
    },
  },
});
