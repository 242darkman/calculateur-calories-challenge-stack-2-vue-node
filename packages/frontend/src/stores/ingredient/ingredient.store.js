import { defineStore } from "pinia";
import { getIngredients } from "src/stores/ingredient/ingredient.api.js";

const getters = {
  GET_INGREDIENTS: (state) => state.ingredients,
};

const actions = {
  async getIngredients() {
    try {
      const ingredients = await getIngredients();
      this.ingredients = ingredients;
      return ingredients;
    } catch (error) {
      console.error("Erreur lors de la récupération des ingrédients :", error);
      throw error;
    }
  },
};

const state = () => ({
  ingredients: [],
});

export const useIngredientStore = defineStore("ingredient", {
  state,
  getters,
  actions,
});
