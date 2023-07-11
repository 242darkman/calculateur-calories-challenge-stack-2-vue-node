import { login, logout, me, register } from "src/stores/auth/auth.api.js";

import { defineStore } from "pinia";
const getters = {
  IS_USER_AUTHENTICATED: (state) => state.isUserAuthenticated,
};

const actions = {

  async logout() {
    try {
      await logout();
      localStorage.removeItem("access_token");
      this.isUserAuthenticated = false;
    } catch (error) {
      console.error("Erreur lors de la déconnexion de l'utilisateur :", error);
      throw error;
    }
  },


  checkAuthentication() {
    const token = localStorage.getItem("access_token");
    if (token) {
      this.isUserAuthenticated = true;
    }
  },
};

const state = () => ({
  isUserAuthenticated: false,
  user: null,
});

export const useAuthStore = defineStore("auth", {
  state,
  getters,
  actions,

  setup() {
    this.checkAuthentication();
  },
});
