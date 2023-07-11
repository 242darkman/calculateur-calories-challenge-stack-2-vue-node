<template>
  <div class="profile-page">
    <h2>Profil de l'utilisateur</h2>
    <q-card class="profile-card">
      <q-card-section class="info-header"> Mes informations </q-card-section>

      <q-list class="info-list">
        <q-item>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>Nom d'utilisateur :</q-item-section>
          <q-item-section side>{{ user && user.userName }}</q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Prénom :</q-item-section>
          <q-item-section side>{{ user.firstName }}</q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="person_outline" />
          </q-item-section>
          <q-item-section>Nom :</q-item-section>
          <q-item-section side>{{ user.lastName }}</q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="email" />
          </q-item-section>
          <q-item-section>Email :</q-item-section>
          <q-item-section side>{{ user.email }}</q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>Date d'inscription :</q-item-section>
          <q-item-section side>{{
            new Date(user.arrivedAt).toLocaleDateString()
          }}</q-item-section>
        </q-item>
      </q-list>

      <q-card-section>
        <q-btn
          class="delete-account"
          color="negative"
          label="Supprimer le compte"
          @click="confirmDelete"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { onBeforeMount, toRefs, reactive } from "vue";
import { useAuthStore } from "../../stores/auth/auth.store.js";
import { useUserStore } from "../../stores/user/user.store.js";
import { useRouter } from "vue-router";
import get from "lodash/get.js";

export default {
  name: "UserProfile",
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();
    const state = reactive({
      user: {},
    });

    async function confirmDelete() {
      const confirmation = window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
      );

      if (confirmation) {
        try {
          const user = authStore.GET_USER;
          const userId = get(user, "_id");
          await userStore.deleteUser({ id: userId });
          alert("Votre compte a été supprimé avec succès.");
          await authStore.logout();
          router.push("/");
        } catch (error) {
          alert(
            "Une erreur est survenue lors de la suppression de votre compte."
          );
          console.error(
            "Une erreur est survenue lors de la suppression de votre compte.",
            error
          );
        }
      }
    }

    onBeforeMount(async () => {
      const user = await authStore.me();
      state.user = user;
    });

    return {
      ...toRefs(state),
      confirmDelete,
    };
  },
};
</script>

<style scoped lang="scss">
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  box-sizing: border-box;
}

.profile-card {
  max-width: 600px;
  width: 100%;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  margin-top: 2em;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);

  .info-header {
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
    margin-bottom: 1em;
  }

  .info-list {
    list-style-type: none;
    padding: 0;
    li {
      margin: 0.5em 0;
      font-size: 1em;
      color: #333;
    }
  }

  .delete-account {
    margin-top: 1em;
    color: #fff;
    background-color: #f00;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 1.2em;
  }
}

/* Make the page responsive for devices with smaller screens */
@media (max-width: 600px) {
  .profile-page {
    padding: 0.5em;
  }
  .profile-card {
    .info-header {
      font-size: 1.2em;
    }
    .info-list {
      li {
        font-size: 0.9em;
      }
    }
    .delete-account {
      font-size: 1em;
    }
  }
}
</style>
