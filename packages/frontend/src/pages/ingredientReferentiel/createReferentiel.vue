<template>
  <router-link to="/ingredient-referentiel">Liste</router-link>

  <q-page class="flex flex-center">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Création de référentiel</div>
        <q-input
          outlined
          v-model="name"
          label="Name"
          class="q-mt-md"
          :rules="[(val) => !!val || 'This field is required']"
        />
        <q-input
          outlined
          v-model="calories"
          label="Calorie"
          class="q-mt-md"
          :rules="[(val) => !!val || 'This field is required']"
        />
        <q-input
          outlined
          v-model="proteines"
          label="Proteine"
          class="q-mt-md"
          :rules="[(val) => !!val || 'This field is required']"
        />
        
        <div class="row justify-center q-mt-md">
          <q-btn
            color="primary"
            label="Enregistrer"
            class="btn"
            @click="create"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>

import { toRefs, reactive } from "vue";
import { useIngredientReferentielStore } from "../../stores/ingredientReferentiel/ingredientReferentiel.store.js";
import { useRouter } from "vue-router";

export default({
    setup() {
        const useIngredientthStore = useIngredientReferentielStore();
        const router = useRouter();
        const state = reactive({
        name: "",
        calories: 0,
        proteines: 0,
        loading: false,
        });

        function goToReferentiels() {
          router.push("/ingredient-referentiel");
        }

        async function create() {
          state.loading = true;
          try {
              await useIngredientthStore.create({
                  name: state.name,
                  calories: state.calories,
                  proteines: state.proteines,
              });
              goToReferentiels();
          } catch (error) {
              console.error(error);
          } finally {
              state.loading = false;
          }
        }

        return {
          ...toRefs(state),
          create,
          goToReferentiels,
      };
        
    },
})
</script>


<style scoped lang="scss">
  .q-card {
    max-width: 70%;
  }

  .btn {
    font-size: 20px;
    width: 200px;
    height: 60px;
  }
</style>
