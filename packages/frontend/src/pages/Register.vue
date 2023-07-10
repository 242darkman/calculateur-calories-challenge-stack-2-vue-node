<template>
  <q-page class="flex flex-center">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Inscription</div>
        <q-input
          outlined
          v-model="firstname"
          label="Firstname"
          class="q-mt-md"
          lazy-rules
        />
         <q-input
          outlined
          v-model="lastname"
          label="Lastname"
          class="q-mt-md"
          lazy-rules
        />
        <q-input
          outlined
          v-model="username"
          label="Username"
          class="q-mt-md"
          lazy-rules
        />
        <q-input
          outlined
          v-model="email"
          label="Email"
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
            <p> <router-link to="/login">Déja inscript ? cliquez ici</router-link> </p>
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
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            showPassword: false,
            loading: false,
            });
        
        return {
            ...toRefs(state),
        }
    }
};
</script>


<style scoped lang="scss">
    .q-card {
    max-width: 60%;
    }
</style>