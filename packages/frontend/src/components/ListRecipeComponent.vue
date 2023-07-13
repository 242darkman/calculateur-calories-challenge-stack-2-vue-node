<template>
    <div>
        <div style="text-align: right;margin: auto;">

        <q-table
        flat
        hide-header
        bordered
        title=""
        :rows="rows"
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
            placeholder="Rechercher"
            >
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input>
        </template>

        <template v-slot:body-cell-btnDetail="recipe">
            <q-td :recipe="recipe">
            <q-btn
                @click="$router.push('/details-recipe/' + recipe.row._id)"
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
import { ref } from "vue";

const columns = [
  {
    name: "title",
    required: true,
    label: "Titre",
    align: "left",
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "btnDetail", align: "right", label: "Détails", field: "btnDetail" },
 
];

const rows = [
    {
        "title": "Recette 1",
        "_id":"1"
    },
    {
        "title": "Recette 2",
        "_id":"2"
    },
    {
        "title": "Recette 3",
        "_id":"3"
    },
    {
        "title": "Recette 4",
        "_id":"4"
    },
    {
        "title": "Recette 5",
        "_id":"5"
    },
    {
        "title": "Recette 6",
        "_id":"6"
    }
]

export default {
  name: "ListRecipeComponent",
  setup() {

    return {
        columns,
        rows,
        filter: ref(""),
    };
  },
};
</script>

<style lang="sass" scoped>
</style>