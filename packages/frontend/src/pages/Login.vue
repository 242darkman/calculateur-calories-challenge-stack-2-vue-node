<template>
  <q-page class="flex flex-center">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Connexion</div>
        <q-input
          outlined
          v-model="username"
          label="Email ou Username"
          class="q-mt-md"
          lazy-rules
        />
        <q-input
          outlined
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Mot de passe"
          class="q-mt-md"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        <div class="row justify-center q-mt-md">
          <q-btn
            :loading="loading"
            color="primary"
            label="Se connecter"
            @click="login"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { toRefs, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      username: "",
      password: "",
      showPassword: false,
      loading: false,
    });

    function login() {
      state.loading = true;
      console.log(`Username/Email: ${state.username}`);
      console.log(`Password: ${state.password}`);
      // Simule une attente de réponse de l'API
      setTimeout(() => {
        state.loading = false;
      }, 2000);
    }

    return {
      ...toRefs(state),
      login,
    };
  },
};
</script>

<style scoped lang="scss">
.q-card {
  max-width: 50%;
}
</style>
