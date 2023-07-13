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
    console.error("Erreur lors de la récupération des recettes :", error);
  }
}

export async function getRecipe({ id }) {
  try {
    const uri = `/recipe/${id}`;
    const response = await api.get(uri);
    const recipe = response.data;
    return recipe;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes :", error);
  }
}

export async function getRecipeCalories({ recipeId }) {
  try {
    const uri = `/recipe/${recipeId}/analyze`;
    const response = await api.get(uri);
    const recipeCalories = response.data;
    return recipeCalories;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes :", error);
  }
}

export async function deleteRecipe({ recipeId }) {
  try {
    const uri = `/recipe/${recipeId}`;
    const response = await api.delete(uri);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes :", error);
  }
}

export async function updateRecipe({ title, ingredients, steps }) {
  const body = { title, ingredients, steps };
  try {
    const response = await api.put("/recipe", body);
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de la recette :", error);
  }
}

export async function getExport({ id }) {
  try {
    const uri = `recipe/${id}/export`;
    const response = await api.get(uri);
    const ingredient = response.data;
    return ingredient;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations sur les référentiels :",
      error
    );
  }
}
