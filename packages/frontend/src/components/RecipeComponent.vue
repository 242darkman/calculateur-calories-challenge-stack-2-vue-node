<template>
    <div>
<q-card class="my-card q-pb-lg q-mb-xl">
    <q-card-section class="bg-light-blue-8 text-white row justify-between" style="gap:15px">
      <div class="text-h6">Recette 1</div>

    <q-btn flat   icon="more_vert">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Modifier</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Analyser</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Exporter en JSON</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Exporter en CSV</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="confirm = true">
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
          <q-btn flat label="Supprimer" color="primary" v-close-popup />
          <q-btn flat label="Annuler" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-card-section>

    <q-card-section class="text-black row items-start" style="gap:15px">
     <p class="q-pa-sm ingredient" >Beurre - 125g</p>
     <p class="q-pa-sm ingredient" >Oeufs - 2</p>
    </q-card-section>
   
    <q-list bordered separator>
    <q-item v-ripple class="q-pa-md">
      <q-item-section>
        <q-item-label class="text-subtitle1 text-light-blue-8">Etape 1</q-item-label>
        <q-item-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa optio ducimus architecto fuga laborum nobis, saepe ea delectus vel, corporis quae praesentium vitae quidem reiciendis sint, et porro accusantium perspiciatis.</q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-ripple class="q-pa-md">
      <q-item-section>
        <q-item-label class="text-subtitle1 text-light-blue-8">Etape 2</q-item-label>
        <q-item-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa optio ducimus architecto fuga laborum nobis, saepe ea delectus vel, corporis quae praesentium vitae quidem reiciendis sint, et porro accusantium perspiciatis.</q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-ripple class="q-pa-md">
      <q-item-section>
        <q-item-label class="text-subtitle1 text-light-blue-8">Etape 3</q-item-label>
        <q-item-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa optio ducimus architecto fuga laborum nobis, saepe ea delectus vel, corporis quae praesentium vitae quidem reiciendis sint, et porro accusantium perspiciatis.</q-item-label>
      </q-item-section>
    </q-item> 
  </q-list>
  </q-card>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "RecipeComponent",
  setup() {
    return {
        confirm: ref(false),
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card 
  width: 100%

.ingredient
  border:2px solid #0288d1
  border-radius: 5px
</style>