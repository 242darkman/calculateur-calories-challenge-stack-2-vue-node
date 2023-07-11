import { Schema, mongoose } from 'mongoose';
const ingredientRefentielSchema = new Schema({
  name: {
    type: String,
    required: [true],
  },

  calories: {
    type: mongoose.Types.Decimal128,
    required: [true],
  },

  proteines: {
    type: mongoose.Types.Decimal128,
    required: [true],
  },
});

const IngredientRefentiel = mongoose.model(
  'IngredientRefentiel',
  ingredientRefentielSchema
);
export default IngredientRefentiel;
