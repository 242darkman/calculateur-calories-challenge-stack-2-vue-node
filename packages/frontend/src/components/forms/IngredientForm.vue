<template>
  <div class="container">
    <div class="left-column q-pa-md" style="max-width: 700px">
      <div class="q-gutter-md">
        <q-select
          filled
          v-model="model"
          :options="ingredients"
          option-label="name"
          multiple
          label="Choisissez vos ingredients"
          @input="closeDropdown"
          ref="select"
        />
      </div>
      <div v-if="model.length > 0">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-input
                v-model.number="formattedIngredients[model.length - 1].quantity"
                :rules="[(val) => !!val || 'Quantité requise']"
                type="number"
                label="Quantité"
              />
              <q-select
                v-model="formattedIngredients[model.length - 1].unit"
                :options="['g', 'mL']"
                :rules="[(val) => !!val || 'Unité requise']"
                label="Unité"
              />
              <q-btn
                :disabled="
                  !formattedIngredients[model.length - 1].quantity ||
                  !formattedIngredients[model.length - 1].unit
                "
                @click="updateItem(model.length - 1)"
                label="ajouter"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="right-column q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Ingredients</div>
          <div
            v-for="(item, index) in mergedIngredients"
            :key="index"
            class="q-mt-md"
          >
            <q-badge color="grey-7" multi-line>
              {{ item.quantity }}{{ item.unit }} {{ item.name }}
              <span
                class="close-icon"
                style="
                  background-color: darkred;
                  border-radius: 50%;
                  margin-left: 10px;
                  width: 20px;
                  height: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.8em;
                "
              >
                <q-btn
                  dense
                  flat
                  round
                  icon="close"
                  class="dark-grey-icon"
                  style="font-size: 0.8em"
                  @click="removeItem(index)"
                ></q-btn>
              </span>
            </q-badge>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, toRefs, watch } from "vue";
import { useIngredientStore } from "../../stores/ingredient/ingredient.store.js";
import map from "lodash/map.js";
import get from "lodash/get.js";
import find from "lodash/find.js";
import merge from "lodash/merge.js";
import reduce from "lodash/reduce.js";

export default {
  name: "IngredientForm",
  emits: ["ingredients"],
  setup(_, { emit }) {
    const ingredientStore = useIngredientStore();

    const state = reactive({
      model: [],
      ingredients: [],
      formattedIngredients: [],
      mergedIngredients: [],
      tempListe: [],
    });

    function formatCollection(ingredients) {
      const formattedCollection = map(ingredients, (ingredient) => {
        const ingredientId = get(ingredient, "_id");
        return {
          ingredient: ingredientId,
          quantity: 0,
          unit: "",
        };
      });
      return formattedCollection;
    }

    function mergeCollections(x, y) {
      return reduce(
        x,
        (result, itemX) => {
          const itemY = find(y, (itemY) => itemY.ingredient === itemX._id);
          if (itemY) {
            result.push(merge({}, itemX, itemY));
          }
          return result;
        },
        []
      );
    }

    function updateItem(index) {
      state.tempListe = JSON.parse(JSON.stringify(state.formattedIngredients));
      // Copy the updated item back to the original liste
      state.formattedIngredients[index] = JSON.parse(
        JSON.stringify(state.tempListe[index])
      );
      state.mergedIngredients = mergeCollections(
        state.ingredients,
        state.formattedIngredients
      );
      emit("ingredients", { ingredients: state.formattedIngredients });
    }

    function closeDropdown() {
      this.$refs.select.blur();
    }

    function removeItem(index) {
      // Remove the ingredient from the model
      state.model.splice(index, 1);
      // Remove the ingredient from the formattedIngredients
      state.formattedIngredients.splice(index, 1);
      // Update the mergedIngredients
      state.mergedIngredients = mergeCollections(
        state.ingredients,
        state.formattedIngredients
      );
      emit("ingredients", { ingredients: state.formattedIngredients });
    }

    watch(
      () => state.model,
      (newModel, oldModel) => {
        if (newModel.length > oldModel.length) {
          const newIngredient = newModel[newModel.length - 1];
          state.formattedIngredients.push({
            ingredient: get(newIngredient, "_id"),
            quantity: 0,
            unit: "",
          });
        } else if (newModel.length < oldModel.length) {
          // An ingredient was removed, handle it accordingly.
          // For example, you can filter it out from formattedIngredients.
        }
      }
    );

    onBeforeMount(async () => {
      state.ingredients = await ingredientStore.getIngredients();
    });

    return {
      ...toRefs(state),
      updateItem,
      closeDropdown,
      removeItem,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  gap: 1rem;

  .left-column {
    flex: 2;

    &:not(:last-child) {
      margin-right: 20px;
    }

    .q-badge {
      font-size: 1.5em;
      padding: 10px;
    }
  }

  .right-column {
    flex: 2;

    .q-card-section {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .q-badge {
        font-size: 1em;
        padding: 6px;
        margin-right: 10px;
      }

      .close-icon {
        margin-left: 10px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: darkred;
      }

      .close-icon .q-btn {
        font-size: 0.8em;

        .dark-grey-icon {
          color: #555;
        }
      }
    }
  }
}
</style>
