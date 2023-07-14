<template>
  <div class="step-form">
    <q-card class="form-card">
      <q-card-section class="card-content">
        <div>
          <h2 class="step-title">{{ `Etape ${steps.length + 1}` }}</h2>
          <q-input
            class="form-field full-width"
            filled
            v-model="step.title"
            label="Titre de l'étape"
          />
          <q-input
            class="form-field full-width"
            filled
            v-model="step.description"
            label="Saississez une description pour cette étape"
            type="textarea"
          />
        </div>
        <q-btn
          color="positive"
          round
          icon="add"
          @click="addStep"
          class="add-button"
        />
      </q-card-section>
    </q-card>
    <q-card class="steps-card">
      <q-card-section>
        <q-list v-if="steps.length">
          <q-item v-for="(item, index) in steps" :key="index">
            <q-item-section class="step-item">
              <div class="step-info">
                <h3>{{ `Etape ${index + 1}:` }}</h3>
                <p>{{ item.title }}</p>
              </div>
              <p>{{ item.description }}</p>
              <q-btn
                color="negative"
                icon="delete"
                @click="removeStep(index)"
              />
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else>Aucune étape n'a été ajoutée</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "StepForm",
  emits: ["steps"],
  setup(_, { emit }) {
    const state = reactive({
      step: {
        title: "",
        description: "",
      },
      steps: [],
    });

    function addStep() {
      if (
        state.step.title.trim() === "" ||
        state.step.description.trim() === ""
      ) {
        alert("Le titre et la description ne doivent pas être vides");
        return;
      }
      state.steps.push({ ...state.step });
      state.step.title = "";
      state.step.description = "";
      emit("steps", { steps: state.steps });
    }

    function removeStep(index) {
      state.steps.splice(index, 1);
      emit("steps", { steps: state.steps });
    }

    return { ...toRefs(state), addStep, removeStep };
  },
};
</script>

<style lang="scss">
.step-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  gap: 1rem;

  .form-card,
  .steps-card {
    width: 45%;
    padding: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #eaeaea;
  }

  .form-field {
    margin-bottom: 1rem;
  }

  .full-width {
    width: 100%;
  }

  .step-title {
    align-self: flex-start;
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .step-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    h3 {
      font-size: 1rem;
    }

    .step-info {
      display: flex;
      align-items: baseline;

      h3,
      p {
        margin: 0;
        margin-right: 0.5rem;
      }
    }
  }

  .add-button {
    align-self: flex-end;
  }
}
</style>
