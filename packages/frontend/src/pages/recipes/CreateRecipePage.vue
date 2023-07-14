<template>
  <q-page class="flex items-center justify-center full-height full-width">
    <div class="flex items-center justify-center full-height full-width">
      <q-stepper
        active-color="primary"
        v-model="currentStep"
        class="full-width"
        done-color="secondary"
      >
        <q-step
          name="1"
          :done="title !== ''"
          icon="assignment"
          order="1"
          title="Nommer votre recette"
        >
          <q-input
            outlined
            v-model="title"
            label="Nom de la recette"
            class="full-width"
          />
          <div class="flex justify-end q-mt-md">
            <q-btn
              v-if="currentStep !== '1'"
              color="negative"
              text-color="white"
              @click="currentStep = getPreviousStep(currentStep)"
              icon-left="arrow_back"
              class="q-mr-md"
              >Précédent</q-btn
            >
            <q-btn
              color="primary"
              text-color="white"
              @click="currentStep = getNextStep(currentStep)"
              icon-right="arrow_forward"
              :disabled="title === ''"
              >Suivant</q-btn
            >
          </div>
        </q-step>

        <q-step
          name="2"
          :done="ingredients.length > 0"
          title="Sélectionnez vos ingrédients"
          icon="kitchen"
          order="2"
        >
          <IngredientForm @ingredients="handleClickIngredient" />
          <div class="flex justify-end q-mt-md">
            <q-btn
              v-if="currentStep !== '1'"
              color="negative"
              text-color="white"
              @click="currentStep = getPreviousStep(currentStep)"
              icon-left="arrow_backward"
              class="q-mr-md"
              >Précédent</q-btn
            >
            <q-btn
              color="positive"
              text-color="white"
              @click="currentStep = getNextStep(currentStep)"
              icon-right="arrow_forward"
              :disabled="ingredients.length === 0"
              class="q-mr-md"
              >Suivant</q-btn
            >
          </div>
        </q-step>

        <q-step
          name="3"
          :done="steps.length > 0"
          icon="list"
          title="Entrez les étapes de préparation"
          order="3"
        >
          <StepForm @steps="handleClickSteps" />
          <div class="flex justify-end q-mt-md">
            <q-btn
              v-if="currentStep !== '1'"
              color="negative"
              text-color="white"
              @click="currentStep = getPreviousStep(currentStep)"
              icon-left="arrow_backward"
              class="q-mr-md"
              >Précédent</q-btn
            >
            <q-btn
              color="accent"
              text-color="white"
              @click="createRecipe"
              icon-right="create"
              :disabled="steps.length === 0"
              :loading="loading"
              >Je crée ma recette</q-btn
            >
          </div>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import get from "lodash/get.js";
import IngredientForm from "src/components/forms/IngredientForm.vue";
import StepForm from "src/components/forms/StepForm.vue";
import { useAuthStore } from "../../stores/auth/auth.store.js";
import { useRecipeStore } from "../../stores/recipe/recipe.store.js";

export default {
  name: "CreateRecipePage",
  components: {
    IngredientForm,
    StepForm,
  },
  setup() {
    const authStore = useAuthStore();
    const recipeStore = useRecipeStore();
    const router = useRouter();
    const state = reactive({
      currentStep: "1",
      title: "",
      ingredients: [],
      steps: [],
      loading: false,
    });

    function handleClickIngredient({ ingredients }) {
      state.ingredients = ingredients;
    }

    function handleClickSteps({ steps }) {
      state.steps = steps;
    }

    async function createRecipe() {
      state.loading = true;
      const user = await authStore.me();
      const author = get(user, "_id");
      await recipeStore.createRecipe({
        title: state.title,
        author,
        ingredients: state.ingredients,
        steps: state.steps,
      });
      state.loading = false;
      router.push("/");
    }

    function getPreviousStep(currentStep) {
      const steps = ["1", "2", "3"];
      const currentIndex = steps.indexOf(currentStep);
      const previousIndex = currentIndex - 1;
      return steps[previousIndex] || currentStep;
    }

    function getNextStep(currentStep) {
      const steps = ["1", "2", "3"];
      const currentIndex = steps.indexOf(currentStep);
      const nextIndex = currentIndex + 1;
      return steps[nextIndex] || currentStep;
    }

    return {
      ...toRefs(state),
      handleClickIngredient,
      handleClickSteps,
      getPreviousStep,
      getNextStep,
      createRecipe,
    };
  },
};
</script>
