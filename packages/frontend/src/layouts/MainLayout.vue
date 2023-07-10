<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 1200px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan">
        <q-toolbar>
          <q-btn flat round dense to="/" icon="home" />
          <q-btn
            color="white"
            flat
            to="/second-page"
            label="Mon apprentissage de Quasar"
          />
          <q-space />
          <q-btn glossy color="deep-orange" label="Appuyez ici">
            <q-popup-proxy>
              <q-banner>
                <template v-slot:avatar>
                  <q-icon name="info" color="primary" />
                </template>
                Vous pouvez aussi utiliser des boutons pour afficher des infos
                comme ceci
              </q-banner>
            </q-popup-proxy>
          </q-btn>
          <q-space />
          <q-btn color="negative" to="/test-404" label="Testez la 404">
            <q-tooltip class="bg-red" :offset="[10, 10]">
              N'aie pas peur !
            </q-tooltip>
          </q-btn>
          <q-space />
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            John
          </q-chip>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  setup() {
    return {};
  },
};
</script>
