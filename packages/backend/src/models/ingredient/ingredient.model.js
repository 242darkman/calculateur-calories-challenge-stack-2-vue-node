import { Schema, mongoose } from 'mongoose';
import IngredientRefentiel from './ingredientRefentiel.model.js';
const ingredientSchema = new Schema({
  ingredient: [
    {
      type: [IngredientRefentiel.schema],
      required: [true, 'IngredientRefentiel are required'],
    },
  ],

  quantity: {
    type: Number,
    required: [true],
  },

  unit: {
    type: String,
    required: [true],
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
export default Ingredient;
