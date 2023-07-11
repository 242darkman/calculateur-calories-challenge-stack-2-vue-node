import { defineStore } from "pinia";
import { deleteUser } from "src/stores/user/user.api.js";

const getters = {};

const actions = {
  async deleteUser({ id }) {
    try {
      const data = await deleteUser({ id });
      return data;
    } catch (error) {
      console.error("lors de la suppression de l'utilisateur :", error);
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
