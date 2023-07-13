<template>

  <q-btn
    class="q-mb-lg"
    to="/"
    unelevated
    color="light-blue-8"
    icon="arrow_back"
  ></q-btn>

  <div class="text-h4 q-mb-lg">Préparation de la recette</div>

  <div v-if="isAnalyzed" class="q-mb-lg">
    <q-card class="my-card q-pb-lg q-mb-xl">
      <q-card-section
        class="bg-light-blue-8 text-white row justify-between"
        style="gap: 15px"
      >
        <div class="text-h6">Valeur Calorique</div>
        <div class="text-h6">{{ recipeTotalCalories }} kcal</div>
      </q-card-section>
    </q-card>
  </div>

  <div>
    <q-card class="my-card q-pb-lg q-mb-xl">
      <q-card-section
        class="bg-light-blue-8 text-white row justify-between"
        style="gap: 15px"
      >
        <div v-if="!editMode" class="text-h6">{{ recipe?.title }}</div>
        <q-input
          v-else
          filled
          v-model="recipe.title"
          class="text-h6 full-width"
        ></q-input>

        <div class="row justify-end">
          <q-btn
            flat
            icon="edit"
            @click="editMode = true"
            color="white"
            v-if="!editMode"
          ></q-btn>
          <q-btn
            flat
            icon="save"
            @click="saveChanges"
            color="white"
            v-if="editMode"
          ></q-btn>
          <q-btn
            flat
            icon="cancel"
            @click="editMode = false"
            color="white"
            v-if="editMode"
          ></q-btn>
        </div>

        <q-btn flat icon="more_vert">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Modifier</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="analyzeRecipe">
                <q-item-section>Analyser</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Exporter en JSON</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Exporter en CSV</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="confirm = true"
                v-if="owner._id === recipe.author"
              >
                <q-item-section>Supprimer</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="primary" text-color="white" />
              <span class="q-ml-sm">Supprimer la recette ? </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Supprimer"
                color="primary"
                v-close-popup
                @click="deleteRecipe"
              />
              <q-btn flat label="Annuler" color="black" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>

      <q-card-section class="text-black row items-start" style="gap: 15px">
        <div v-for="(ingredient, index) in recipe?.ingredients" :key="index">
          <p class="q-pa-sm ingredient">
            <q-icon name="fastfood" />
            {{ ingredient.name }} - {{ ingredient.quantity
            }}{{ ingredient.unit }}
          </p>
        </div>
      </q-card-section>

      <q-list bordered separator>
        <div v-for="(step, index) in recipe?.steps" :key="index">
          <q-item v-ripple class="q-pa-md">
            <q-item-section>
              <q-item-label class="text-subtitle1 text-light-blue-8"
                >Etape {{ index + 1 }}</q-item-label
              >
              <q-item-label>{{ step.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { toRefs, reactive, onBeforeMount } from "vue";
import { useRecipeStore } from "../../stores/recipe/recipe.store.js";
import { useIngredientReferentielStore } from "../../stores/ingredientReferentiel/ingredientReferentiel.store.js";
import { useAuthStore } from "../../stores/auth/auth.store.js";
import { useRoute, useRouter } from "vue-router";
import get from "lodash/get.js";
import map from "lodash/map.js";

export default {
  name: "DetailsRecipePage",
  setup() {
    const recipeStore = useRecipeStore();
    const ingredientReferentielStore = useIngredientReferentielStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      confirm: false,
      recipe: null,
      isAnalyzed: false,
      editMode: false,
      recipeTotalCalories: 0,
      owner: null,
    });

    async function formatRecipe({ recipe }) {
      const promises = map(recipe.ingredients, async (ingredient) => {
        const ingredientId = get(ingredient, "ingredient");
        const ingredientReferentiel =
          await ingredientReferentielStore.getIngredientReferentiel({
            id: ingredientId,
          });
        const formateIngredient = {
          ...ingredient,
          name: ingredientReferentiel.name,
        };

        return formateIngredient;
      });

      const formattedIngredients = await Promise.all(promises);

      const formattedRecipe = {
        ...recipe,
        ingredients: formattedIngredients,
      };

      return formattedRecipe;
    }

    async function analyzeRecipe() {
      const recipeId = get(state.recipe, "_id");
      const recipeCalories = await recipeStore.getRecipeCalories({ recipeId });
      state.recipeTotalCalories = get(recipeCalories, "totalCalories");
      state.isAnalyzed = true;
    }

    async function deleteRecipe() {
      const recipeId = get(state.recipe, "_id");
      await recipeStore.deleteRecipe({ recipeId });
      state.confirm = false;
      router.push("/");
    }

    onBeforeMount(async () => {
      const id = get(route.params, "id");
      const recipe = await recipeStore.getRecipe({ id });
      state.recipe = await formatRecipe({ recipe });
      state.owner = await authStore.me();
    });

    return {
      ...toRefs(state),
      analyzeRecipe,
      deleteRecipe,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}

.ingredient {
  border: 2px solid #0288d1;
  border-radius: 5px;
  background-color: #e8f5e9;
  color: #42a5f5;
  padding: 10px;
}
</style>
