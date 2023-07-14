import {
  getIngredientReferentiels,
  getIngredientReferentiel,
  update,
  create,
  deleteReferentiel,
} from "src/stores/ingredientReferentiel/ingredientReferentiel.api.js";
import { defineStore } from "pinia";

const mutations = {
  setIngredientReferentiel(state, ingredientReferentiel) {
    state.ingredientReferentiel = ingredientReferentiel;
  },
};

const actions = {
  async getIngredientReferentiels() {
    try {
      const ingredientInfo = await getIngredientReferentiels();
      this.ingredientReferentiel = ingredientInfo;
      return ingredientInfo;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations des referentiel :",
        error
      );
      throw error;
    }
  },

  async getIngredientReferentiel({ id }) {
    try {
      const data = await getIngredientReferentiel({ id });
      return data;
    } catch (error) {
      console.error("erreur de la récupération par id:", error);
      throw error;
    }
  },

  async create({ name, calories, proteines }) {
    try {
      await create({
        name,
        calories,
        proteines,
      });
    } catch (error) {
      console.error("Erreur lors de la création dans le store :", error);
      throw error;
    }
  },

  async update({ id, ingredient }) {
    try {
      await update({ id, ingredient });
    } catch (error) {
      console.error("Erreur lors de la mise a jour :", error);
      throw error;
    }
  },

  async delete({ id }) {
    try {
      const data = await deleteReferentiel({ id });
      return data;
    } catch (error) {
      console.error("erreur de la suppression id:", error);
      throw error;
    }
  },
};

const state = () => ({
  ingredientReferentiel: null,
});

export const useIngredientReferentielStore = defineStore(
  "ingredientReferentiel",
  {
    state,
    actions,
    mutations,
  }
);
