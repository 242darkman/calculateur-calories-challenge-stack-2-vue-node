<template>
  <div>
    <div class="text-h4">
      Ceci est la page principage, considérée comme le composant parent
    </div>
    <p>
      <q-btn
        class="q-mt-md"
        color="primary"
        text-color="white"
        label="Clique ici pour changer le texte de la props"
        @click="changePropsMessage"
      />
    </p>
    <p><ChildComponentExample :propsMessage="propsMessage" /></p>
    <p><StoreExample /></p>
  </div>
</template>

<script>
import { ref } from "vue";
import ChildComponentExample from "../components/ChildComponentExample.vue";
import StoreExample from "../components/StoreExample.vue";

export default {
  name: "HomePage",
  components: {
    ChildComponentExample,
    StoreExample,
  },
  setup() {
    let propsMessageNumber = 1;
    const propsMessage = ref("Ceci est le 1er message qui passe par la props");
    const changePropsMessage = () => {
      if (propsMessageNumber === 1) {
        propsMessage.value = "Ceci est le 2eme message qui passe par la props";
        propsMessageNumber = 2;
      } else {
        propsMessage.value = "Ceci est le 1er message qui passe par la props";
        propsMessageNumber = 1;
      }
    };
    return {
      changePropsMessage,
      propsMessage,
    };
  },
};
</script>
<style></style>
