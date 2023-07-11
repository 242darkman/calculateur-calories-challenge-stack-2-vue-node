<template>
  <q-page class="flex flex-center">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Création de compte</div>
        <q-input
          outlined
          v-model="firstname"
          label="Firstname"
          class="q-mt-md"
          :rules="[(val) => !!val || 'This field is required']"
        />
        <q-input
          outlined
          v-model="lastname"
          label="Lastname"
          class="q-mt-md"
          :rules="[(val) => !!val || 'This field is required']"
        />
        <q-input
          outlined
          v-model="username"
          label="Username"
          class="q-mt-md"
          :rules="[(val) => !!val || 'This field is required']"
        />
        <q-input
          outlined
          v-model="email"
          type="email"
          label="E-mail"
          class="q-mt-md"
          :rules="[
            (val) => !!val || 'This field is required',
            (val) => validateEmail(val) || 'Invalid email',
          ]"
        />
        <q-input
          outlined
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Mot de passe"
          class="q-mt-md"
          :rules="[
            (val) => !!val || 'This field is required',
            (val) =>
              (val && val.length >= 6) ||
              'Password must be at least 6 characters',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        <q-input
          outlined
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          label="Confirmer le mot de passe"
          class="q-mt-md"
          :rules="[
            (val) => !!val || 'This field is required',
            (val) => val === password || 'Passwords do not match',
          ]"
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
            label="Inscription"
            class="register-btn"
            @click="register"
          />
        </div>
        <div class="row justify-center q-mt-md">
          <q-btn
            color="primary"
            label="Déjà inscrit ici? Connexion"
            @click="goToLogin"
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
  name: "Register",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const state = reactive({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      loading: false,
    });

    function goToLogin() {
      router.push("/login");
    }

    async function register() {
      state.loading = true;
      try {
        await authStore.register({
          userName: state.username,
          firstName: state.firstname,
          lastName: state.lastname,
          email: state.email,
          password: state.password,
        });
        goToLogin();
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
    }

    function validateEmail(value) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value);
    }

    return {
      ...toRefs(state),
      register,
      goToLogin,
      validateEmail,
    };
  },
};
</script>

<style scoped lang="scss">
.q-card {
  max-width: 70%;
}

.register-btn {
  font-size: 20px;
  width: 200px;
  height: 60px;
}
</style>
