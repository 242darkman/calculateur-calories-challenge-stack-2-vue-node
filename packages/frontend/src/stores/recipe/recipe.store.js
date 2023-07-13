import {
  createRecipe,
  deleteRecipe,
  exportRecipeAsJson,
  getRecipe,
  getRecipeCalories,
  getRecipes,
} from "src/stores/recipe/recipe.api.js";

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
      console.error(
        `Erreur lors de la création de la recette '${title}':`,
        error
      );
      throw error;
    }
  },

  async getRecipes() {
    try {
      const recipes = await getRecipes();
      this.recipes = recipes;
      return recipes;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de toutes les recettes :",
        error
      );
      throw error;
    }
  },

  async getRecipe({ id }) {
    try {
      const recipe = await getRecipe({ id });
      return recipe;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la recette avec l'ID:",
        id,
        "\nDétails de l'erreur:",
        error
      );
      throw error;
    }
  },

  async getRecipeCalories({ recipeId }) {
    try {
      const recipeCalories = await getRecipeCalories({ recipeId });
      return recipeCalories;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des calories de la recette :",
        error
      );
      throw error;
    }
  },

  async deleteRecipe({ recipeId }) {
    try {
      const deleteResponse = await deleteRecipe({ recipeId });
      return deleteResponse;
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette :", error);
      throw error;
    }
  },

  async exportRecipeAsJson({ id }) {
    try {
      const data = await exportRecipeAsJson({ id });
      return data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la recette par ID :",
        error
      );
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
