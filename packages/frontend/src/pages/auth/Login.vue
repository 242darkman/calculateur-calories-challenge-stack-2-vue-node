<template>
  <q-page class="flex flex-center">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Connexion</div>
          <q-input
            outlined
            v-model="loginName"
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
        <div class="row justify-center q-mt-md">
          <q-btn
            color="primary"
            label="Vous n'avez pas de compte? S'inscrire"
            @click="goToRegister"
            flat
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { toRefs, reactive } from "vue";
import { useAuthStore } from "../../stores/auth/auth.store.js";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const state = reactive({
      loginName: "",
      password: "",
      showPassword: false,
      loading: false,
    });

    async function login() {
      state.loading = true;
      try {
        await authStore.login({
          loginName: state.loginName,
          password: state.password,
        });
        router.push("/");
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
    }

    function goToRegister() {
      router.push("/register");
    }

    return {
      ...toRefs(state),
      login,
      goToRegister,
    };
  },
};
</script>

<style scoped lang="scss">
.q-card {
  max-width: 70%;
}
</style>
