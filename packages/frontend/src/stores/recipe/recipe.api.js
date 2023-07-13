import { api } from "src/boot/axios.js";

export async function createRecipe({ title, author, ingredients, steps }) {
  const body = { title, author, ingredients, steps };
  try {
    const response = await api.post("/recipe", body);
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de la recette :", error);
  }
}

export async function getRecipes() {
  try {
    const response = await api.get("/recipes");
    const recipes = response.data;
    return recipes;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de toutes les recettes :",
      error
    );
  }
}

export async function getRecipe({ id }) {
  try {
    const uri = `/recipe/${id}`;
    const response = await api.get(uri);
    const recipe = response.data;
    return recipe;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la recette avec l'ID ${id} :`,
      error
    );
  }
}

export async function getRecipeCalories({ recipeId }) {
  try {
    const uri = `/recipe/${recipeId}/analyze`;
    const response = await api.get(uri);
    const recipeCalories = response.data;
    return recipeCalories;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des calories pour la recette avec l'ID ${recipeId} :`,
      error
    );
  }
}

export async function deleteRecipe({ recipeId }) {
  try {
    const uri = `/recipe/${recipeId}`;
    const response = await api.delete(uri);
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de la recette avec l'ID ${recipeId} :`,
      error
    );
  }
}

export async function updateRecipe({ title, ingredients, steps }) {
  const body = { title, ingredients, steps };
  try {
    const response = await api.put("/recipe", body);
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la recette :", error);
  }
}

export async function exportRecipeAsJson({ id }) {
  try {
    const uri = `recipe/${id}/json`;
    const response = await api.get(uri);
    const jsonRecipe = response.data;
    return jsonRecipe;
  } catch (error) {
    console.error(
      "Erreur lors de l'exportation de la recette en JSON :",
      error
    );
  }
}
