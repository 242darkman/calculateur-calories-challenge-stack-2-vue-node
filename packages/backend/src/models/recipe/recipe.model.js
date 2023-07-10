import { Schema, mongoose } from 'mongoose';
const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true],
  },

  author: {
    type: String,
    required: [true],
  },
  publication_date: {
    type: Date,
    default: Date.now(),
  },
  ingredients: {
    type: Array,
    required: [true],
  },
  steps: {
    type: Array,
    required: [true],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
