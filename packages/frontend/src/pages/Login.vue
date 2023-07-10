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
          :rules="[(val) => validateEmail(val) || 'Email invalide']"
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
        <q-btn
          color="primary"
          label="Se connecter"
          class="q-mt-md"
          @click="login"
        />
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
    });

    function login() {
      console.log(`Username/Email: ${state.username}`);
      console.log(`Password: ${state.password}`);
    }

    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    return {
      ...toRefs(state),
      login,
      validateEmail,
    };
  },
};
</script>

<style scoped lang="scss">
.q-card {
  max-width: 50%;
}
</style>
