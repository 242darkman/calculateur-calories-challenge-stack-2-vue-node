import { Schema, mongoose } from 'mongoose';

const ingredientSchema = new Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IngredientRefentiel',
    required: true,
  },

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
