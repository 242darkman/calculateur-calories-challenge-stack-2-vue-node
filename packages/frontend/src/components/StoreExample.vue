<template>
  <div>
    <div class="text-h6">Voici un exemple d'utilisation d'un STORE PINIA</div>
    <q-btn round color="secondary" @click="store.increment" icon="navigation" />
    {{ store.counter }}
  </div>
</template>

<script>
import { useCounterStore } from "../stores/counter";
export default {
  name: "StoreExample",
  setup() {
    const store = useCounterStore();
    return {
      store,
    };
  },
};
</script>
<style></style>
