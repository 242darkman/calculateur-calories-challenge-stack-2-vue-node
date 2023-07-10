import { Schema, mongoose } from 'mongoose';
const ingredientSchema = new Schema({
  name: {
    type: String,
    required: [true],
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
