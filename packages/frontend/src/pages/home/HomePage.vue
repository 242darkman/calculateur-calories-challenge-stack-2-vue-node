<template>
  <div class="text-h4 q-mb-lg">Liste des recettes</div>
  
  <div>
    <ListRecipeComponent />
  </div>
</template>

<script>
import ListRecipeComponent from "../../components/ListRecipeComponent.vue";

export default {
  components: {
    ListRecipeComponent,
  },
  name: "HomePage",
  setup() {
    return {};
  },
};
</script>
<style scoped></style>
