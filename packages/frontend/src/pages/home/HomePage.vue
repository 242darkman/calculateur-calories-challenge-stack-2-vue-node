<template>
  <div class="text-h4 q-mb-lg">Liste des recettes</div>

  <div class="q-pa-md">
    <RecipeComponent />
  </div>
</template>

<script>
import RecipeComponent from "../../components/RecipeComponent.vue";

export default {
  components: {
    RecipeComponent,
  },
  name: "HomePage",
  setup() {
    return {};
  },
};
</script>
<style scoped></style>
