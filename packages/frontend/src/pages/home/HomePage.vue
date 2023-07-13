<template>
  <div class="text-h4 q-mb-lg">Liste des recettes</div>

  <div>
    <div style="text-align: right; margin: auto">
      <q-table
        flat
        bordered
        title=""
        :rows="recipes"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Rechercher une recette"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:header-cell="props">
          <q-th :props="props">
            <div class="text-h7">{{ props.col.label }}</div>
          </q-th>
        </template>

        <template v-slot:body-cell-btnDetail="props">
          <q-td :props="props">
            <q-btn
              @click="$router.push('/details-recipe/' + props.row.id)"
              unelevated
              color="light-blue-8"
              icon="visibility"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, onBeforeMount } from "vue";
import map from "lodash/map.js";
import { useRecipeStore } from "../../stores/recipe/recipe.store.js";
import { useUserStore } from "../../stores/user/user.store.js";

export default {
  name: "HomePage",
  setup() {
    const columns = [
      {
        name: "title",
        required: true,
        label: "Nom de la recette",
        align: "left",
        field: "title",
        sortable: true,
      },
      {
        name: "author",
        required: true,
        label: "Auteur",
        align: "left",
        field: "author",
        sortable: true,
      },
      {
        name: "publicationDate",
        required: true,
        label: "Date de publication",
        align: "left",
        field: "publicationDate",
        sortable: true,
      },
      {
        name: "btnDetail",
        required: true,
        label: "Détails",
        align: "right",
        field: "btnDetail",
      },
    ];

    const recipeStore = useRecipeStore();
    const userStore = useUserStore();
    const state = reactive({
      filter: "",
      recipes: [],
    });

    async function formatRecipes({ recipes }) {
      const formattedRecipes = map(recipes, async (recipe) => {
        const author = await userStore.getUser({ id: recipe.author });

        const date = new Date(recipe.publication_date);
        const formattedDate = date.toLocaleString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return {
          id: recipe._id,
          title: recipe.title,
          author: `${author.firstName} ${author.lastName}`,
          publicationDate: formattedDate,
        };
      });

      return Promise.all(formattedRecipes);
    }

    onBeforeMount(async () => {
      const recipes = await recipeStore.getRecipes();
      state.recipes = await formatRecipes({ recipes });
    });

    return {
      ...toRefs(state),
      columns,
    };
  },
};
</script>
