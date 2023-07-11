<template>
  <div class="text-h4-int">
    Ajouter un ingrédient
    </div>
   <q-page class="flex flex-center test">
    <q-card class="full-width">
      <q-card-section @submit="onSubmit">
        <q-select
          class="q-mt-md"
          filled
          multiple
          v-model="ingredients"
          :options ="choix"
          use-chips
          stack-label
          label="Sélectionner des ingredients"
        />
         <q-input
          outlined
          v-model="quantity"
          label="Quantité"
          class="q-mt-md"
          lazy-rules
        />

        <q-select
          class="q-mt-md"
          filled
          multiple
          v-model="unity"
          :options="options"
          use-chips
          stack-label
          label=" --Sélectionner une unité--"
        />

        <div class="row justify-center q-mt-md">
          <div>
             <q-btn @click="submit" label="Enregistrer" type="submit" color="primary"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import { ref  } from 'vue'
  import { useQuasar } from 'quasar'

export default {
  name: "AddIngredient",
  components: {
  },
  setup() {
    const $q = useQuasar()
    const options = [
      'g', 'ml'
    ]
    const choix = [
      'Tomate', 'Oignon'
    ]
    const unity = ref(null)
    const quantity = ref(null)
    const ingredients = ref(null)

    return {
      options,
      unity,
      quantity,
      choix,
      ingredients,

      onSubmit () {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        },

        submit() {
          console.log('Submit')
        }
};
},
};
</script>

<style>
.q-card {
    max-width: 60%;
    margin-top: none;
    }
.text-h4-int{
  text-align: center;
  margin-top: 20px;
  margin-bottom: none;
  font-family: Open, sans-serif;
  font-size: 40px;
}
</style>
