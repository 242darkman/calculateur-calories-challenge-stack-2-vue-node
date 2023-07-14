import { login, logout, me, register } from "src/stores/auth/auth.api.js";

import { defineStore } from "pinia";
import get from "lodash/get.js";

const getters = {
  IS_USER_AUTHENTICATED: (state) => state.isUserAuthenticated,
  GET_USER: (state) => state.user,
};

const actions = {
  SET_IS_USER_AUTHENTICATED({ isUserAuthenticated }) {
    this.isUserAuthenticated = isUserAuthenticated;
  },

  async login({ loginName, password }) {
    try {
      const loginInfo = await login({ loginName, password });
      const token = get(loginInfo, "token");
      localStorage.setItem("access_token", token);
      this.isUserAuthenticated = true;
    } catch (error) {
      console.error(
        "Erreur lors de l'authentification de l'utilisateur :",
        error
      );
      throw error;
    }
  },

  async register({ userName, firstName, lastName, email, password }) {
    try {
      await register({
        userName,
        firstName,
        lastName,
        email,
        password,
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription de l'utilisateur :", error);
      throw error;
    }
  },

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

  async me() {
    try {
      const userInfo = await me();
      this.user = userInfo;
      return userInfo;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur :",
        error
      );
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
