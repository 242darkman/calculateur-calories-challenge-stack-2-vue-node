<template class="template">
  <div>
    <button v-on:click="warn('Le formulaire ne peut être soumis pour le moment.', $event)">
        Soumettre le formulaire
    </button>
  </div>
</template>

<script>
export default {
  name: "SubmitButton",
  methods: {
  warn: function (message, event) {
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
},
  setup() {
    return {};
  },
};
</script>
<style>
</style>
