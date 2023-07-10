<template>
  <div>
    <div class="text-h4">
    Ajouter une recette
    </div>
    <FormulateForm
  v-model="formValues"
>
  <FormulateInput
    name="name"
    label="What is your name?"
    validation="required"
  />
  <FormulateInput
    name="age"
    label="How old are you?"
    validation="required|number|max:120"
  />
  <FormulateInput
    type="submit"
    label="Sign up"
  />
</FormulateForm>
    <strong>Hello <em>{{ value }}</em>!</strong>
  </div>
  <div><SubmitButton/></div>
</template>

<script>
import { ref } from "vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "AddRecipePage",
  components: {
    SubmitButton,
  },
  setup() {
    return {

};
},
};



</script>
<style></style>
