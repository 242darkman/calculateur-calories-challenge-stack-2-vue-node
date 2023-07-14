<template>
  
  <q-btn class="q-mb-lg" id="btn"
    to="/ingredient-referentiel"
    unelevated
    color="light-blue-8"
    icon="arrow_back"
  ></q-btn>

  <q-page class="flex flex-center">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Mise à jour des informations</div>
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
            @click="update"
          />
        </div>

      </q-card-section> 
    </q-card>
  </q-page>
</template>
<script>
import { onBeforeMount, ref } from "vue";
import { useIngredientReferentielStore } from "../../stores/ingredientReferentiel/ingredientReferentiel.store.js";
import { useRouter, useRoute } from "vue-router";

export default({
    setup() {
        const expanded = ref(false);
        const ingredientReferentielStore = useIngredientReferentielStore();
        const router = useRouter();
        const route = useRoute();

        const referentiel = ref(null);
        const name = ref("") ;
        const calories = ref(0);
        const proteines =  ref(0);

        onBeforeMount(async () => {
            const id = route.params.id;
            referentiel.value = await ingredientReferentielStore.getIngredientReferentiel({id});
            name.value = referentiel.value.name;
            calories.value = referentiel.value.calories.$numberDecimal;
            proteines.value = referentiel.value.proteines.$numberDecimal;
        });

        function goToReferentiels() {
            router.push("/ingredient-referentiel");
        }

        async function update() {
            try {
                const id = referentiel.value._id;
                const ingredient = {
                name: name.value,
                calories: calories.value,
                proteines: proteines.value,
                }
                await ingredientReferentielStore.update({id, ingredient});
                goToReferentiels();
            } catch (error) {
                console.error(error);
            }
        }

      return {
        expanded,
        referentiel,
        name,
        calories,
        proteines,
        goToReferentiels,
        update,
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
  #btn{
    margin-bottom: -15px;
  }
</style>

