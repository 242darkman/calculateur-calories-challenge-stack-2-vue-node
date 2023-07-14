import { deleteUser, getUser } from "src/stores/user/user.api.js";

import { defineStore } from "pinia";

const getters = {};

const actions = {
  async deleteUser({ id }) {
    try {
      const data = await deleteUser({ id });
      return data;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      throw error;
    }
  },

  async getUser({ id }) {
    try {
      const user = await getUser({ id });
      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      throw error;
    }
  },
};

const state = () => ({});

export const useUserStore = defineStore("user", {
  state,
  getters,
  actions,
});
