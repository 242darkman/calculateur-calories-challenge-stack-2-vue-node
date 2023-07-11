import { Schema, mongoose } from 'mongoose';

import Ingredient from '../ingredient/ingredient.model.js';
import Step from '../step/step.model.js';

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true],
  },

  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publication_date: {
    type: Date,
    default: Date.now(),
  },
  ingredients: {
    type: [Ingredient.schema],
    required: [true, 'ingredient are required'],
  },
  steps: {
    type: [Step.schema],
    required: [true, 'Steps are required'],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
