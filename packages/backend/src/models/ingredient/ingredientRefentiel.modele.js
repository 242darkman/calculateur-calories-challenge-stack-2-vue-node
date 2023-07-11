import { Schema, mongoose } from 'mongoose';
const ingredientRefentielSchema = new Schema({
  name: {
    type: String,
    required: [true],
  },

  calories: {
    type: Number,
    required: [true],
  },

  proteines: {
    type: Number,
    required: [true],
  },
});

const IngredientRefentiel = mongoose.model(
  'IngredientRefentiel',
  ingredientRefentielSchema
);
export default IngredientRefentiel;
