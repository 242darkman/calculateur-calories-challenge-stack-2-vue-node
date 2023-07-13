import { api } from "src/boot/axios.js";

export async function getIngredientReferentiels() {
  try {
    const response = await api.get("/ingredientReferentiels");
    const ingredients = response.data;
    return ingredients;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations sur les référentiels :",
      error
    );
  }
}

export async function getIngredientReferentiel({ id }) {
  try {
    const uri = `ingredientReferentiel/${id}`;
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

export async function create({ name, calories, proteines }) {
  const body = { name, calories, proteines };
  try {
    const response = await api.post("/ingredientReferentiel", body);
    const ReferentielInfo = response.data;
    return ReferentielInfo;
  } catch (error) {
    console.error("Erreur lors de la création dans avec l'api :", error);
  }
}

export async function update({ id, ingredient }) {
  try {
    const uri = `ingredientReferentiel/${id}`;
    const response = await api.put(uri, ingredient);
    console.log("id ref est " + uri);

    const updateInfo = response.data;
    return updateInfo;
  } catch (error) {
    console.error("Erreur lors de la mise a jour :", error);
  }
}

export async function deleteReferentiel({ id }) {
  try {
    const uri = `ingredientReferentiel/${id}`;
    const response = await api.delete(uri);
    const ingredient = response.data;
    return ingredient;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}
