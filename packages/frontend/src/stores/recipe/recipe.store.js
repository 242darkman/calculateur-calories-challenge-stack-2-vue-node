import { createRecipe } from "src/stores/recipe/recipe.api.js";
import { defineStore } from "pinia";

const getters = {
  GET_RECIPES: (state) => state.recipes,
};

const actions = {
  async createRecipe({ title, author, ingredients, steps }) {
    try {
      const data = await createRecipe({ title, author, ingredients, steps });
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de la recette :", error);
      throw error;
    }
  },
};

const state = () => ({
  recipes: [],
});

export const useRecipeStore = defineStore("recipe", {
  state,
  getters,
  actions,
});
