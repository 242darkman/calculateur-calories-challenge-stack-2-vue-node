<template>
     <q-btn class="q-mb-lg"
            to="/"
            unelevated
            color="light-blue-8"
            icon="arrow_back"
          ></q-btn>

    <div class="text-h4 q-mb-lg">Détails de la recette</div>
  
    <div >
      <RecipeComponent />
    </div>
  </template>
  
  <script>
  import RecipeComponent from "../../components/RecipeComponent.vue";
  
  export default {
    components: {
      RecipeComponent,
    },
    name: "DetailsRecipePage",
    setup() {
      return {};
    },
  };
  </script>
  <style scoped></style>
  