<template>
  <div class="text-h4">
    Ajouter un ingrédient
    </div>
    <form action="POST" class="form">
        <div>
            <label class="form-control">Nom :</label> <br>
            <input  class = "input" type="text" name="name">
        </div>
        <div>
            <label >Quantité :</label> <br>
            <input class = "input" type="int" name="quantity">
        </div>
        <div>
            <label >Unité :</label> <br>
            <select class = "input" name="unity" id="unity-select">
            <option value="">--Sélectionnez une unité--</option>
            <option value="grammes">g</option>
            <option value="mililitres">ml</option>
            </select>
        </div>
          <div><SubmitButton/></div>
    </form>
</template>

<script>
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "AddIngredient",
  components: {
    SubmitButton,
  },
  setup() {
    return {
};
},
};
</script>

<style>
form  {
  text-align: center;
  align-items: center;
}
 .input {
      height: 30px;
      width : 250px;
 }

.text-h4{
  text-align: center;
  margin-bottom: 30px;
  font-family: Open, sans-serif;
}
</style>
