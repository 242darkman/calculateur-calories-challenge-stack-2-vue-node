<template>
<h3>La liste des ingredients référentiels</h3>
    <q-table :rows="ingredientReferentiels" :columns="columns" :filter="filter">
        <template v-slot:top-right>
            <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Filtrer ici"
            >
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input>
        </template>
            <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>

        <q-td
          ><q-btn
            class="q-mr-sm"
            color="red"
            text-color="white"
            icon="delete"
            @click="confirmDelete(props.row)"
        /></q-td>
        <q-td
          > 
          <q-btn
            class="q-mr-sm"
            color="blue"
            text-color="white"
            icon="edit"
            @click="redirectToEdit (props.row._id)"
        /></q-td>
      </q-tr>
    </template>
    </q-table>
</template>
<script>
    import { onBeforeMount, toRefs, reactive } from "vue";
    import { useIngredientReferentielStore } from "../../stores/ingredientReferentiel/ingredientReferentiel.store.js";
    import { useRouter } from "vue-router";

    export default {
        name: "ingredientReferentiel",
        setup() {
            const router = useRouter();
            const columns = [
                {
                    name: "name",
                    label: "Nom",
                    field: "name",
                    align: "center",
                    sortable: true,
                },
                {
                    name: "calories",
                    label: "Calories",
                    field: "calories",
                    align: "center",
                },
                {
                    name: "proteines",
                    label: "Proteines",
                    field: "proteines",
                    align: "center",
                    sortable: true,
                },
            ];
            const ingredientReferentielStore = useIngredientReferentielStore();
            const state = reactive({
                ingredientReferentiels: [],
                filter: "",
            });  
            
            function redirectToEdit (idReferentiel) {
                router.push({ name: "editReferentiel", params: { id: idReferentiel } });
            }

            async function confirmDelete(ingredient) {
                const idReferentiel = ingredient._id;
                const confirmation = window.confirm(
                    "Êtes-vous sûr de vouloir supprimer votre référentiel ? Cette action est irréversible."
                );

                if (confirmation) {
                    try {
                    await ingredientReferentielStore.delete({ id: idReferentiel });
                    alert("votre référentiel à été supprimé avec succès.");
                    window.location.reload();
                    } catch (error) {
                    alert(
                        "Une erreur est survenue lors de la suppression du référentiel"
                    );
                    console.error(
                        "Une erreur est survenue lors de la suppression du référentiel",
                        error
                    );
                    }
                }
            }
           
            onBeforeMount(async () => {
                const ingredientReferentiels = await ingredientReferentielStore.getIngredientReferentiels();
                state.ingredientReferentiels = ingredientReferentiels;
            });
            return {
                ...toRefs(state),
                columns,
                redirectToEdit,
                confirmDelete,
            };
        }
    }
</script>