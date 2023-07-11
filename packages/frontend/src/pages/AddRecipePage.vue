<template>
  <h4>Ajouter une recette</h4>
  <q-page class="flex flex-center test">
    <q-card class="full-width">
      <q-card-section>
        <q-input
          outlined
          label="Titre"
          class="q-mt-md"
          lazy-rules
        />
         <q-input
          outlined
          label="Auteur"
          class="q-mt-md"
          lazy-rules
        />

        <q-input
          outlined
          label="Etapes"
          class="q-mt-md"
          lazy-rules
        />

        <q-select
          class="q-mt-md"
          filled
          v-model="ingredients"
          multiple
          :options="options"
          use-chips
          stack-label
          label="Multiple selection des ingredients"
        />

        <div class="row justify-center q-mt-md">
          <q-btn
            :loading="loading"
            color="primary"
            label="Enregistrer"
            @click="enregistrer"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

  import { ref, computed  } from 'vue'
  export default {
  name: "AddRecipePage",

  setup () {
    const ingredients = ref([])
    const options = [
      'Tomate', 'Concombre', 'Steack', 'Huile', 'Sel', 'Carotte', 'Tomate2'
    ]
    const filterText = ref('')
    const loading = ref(false);
    const filterIngredients = (text) => {
      filterText.value = text
    }
    const enregistrer = ()=>{
      console.log();
    }

    const filteredOptions = computed(() => {
      if (filterText.value) {
        const filter = new RegExp(filterText.value, 'i')
        return options.filter((option) => filter.test(option))
      }
      return options
    })
    return {
      ingredients,
      options,
      filterText,
      filterIngredients,
      filteredOptions,
      enregistrer,
      loading
    }
  }
};

</script>
<style scoped lang="scss">
    .q-card {
    max-width: 60%;
    }
    h4{
      text-align: center;
      margin-bottom: 0px;
      margin-top: 2px;
    }
</style>
