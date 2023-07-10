<template>
  <div>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h5">
          <p class="col-md-2">Ceci est le composant enfant, avec la props :</p>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-icon class="col-md-2" name="warning" color="warning" />{{
          propsMessage
        }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "ChildComponentExample",
  props: {
    propsMessage: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>
<style>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
