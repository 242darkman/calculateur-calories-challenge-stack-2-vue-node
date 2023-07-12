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
