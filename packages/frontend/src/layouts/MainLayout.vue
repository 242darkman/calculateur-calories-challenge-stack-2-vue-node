<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Calculateur de calories</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <q-item clickable v-ripple to="/add-recipe">
              <q-item-section avatar>
                <q-icon name="add"/>
              </q-item-section>
              <q-item-section> Nouvelle recette </q-item-section>
            </q-item>

            <q-item  clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>

              <q-item-section> Liste des recettes </q-item-section>
            </q-item>

            <q-separator />

            <q-item  clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="person"/>
              </q-item-section>

              <q-item-section> Se connecter </q-item-section>
            </q-item>

            <q-item  clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="logout"/>
              </q-item-section>

              <q-item-section> Déconnexion </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainLayout",
  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    };
  },
};
</script>
