import { api } from "src/boot/axios.js";

export async function getIngredients() {
  try {
    const response = await api.get("/ingredientReferentiels");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des ingrédients :", error);
  }
}
