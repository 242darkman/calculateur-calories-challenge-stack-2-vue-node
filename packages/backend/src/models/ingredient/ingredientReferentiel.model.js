import { Schema, mongoose } from 'mongoose';

const ingredientReferentielSchema = new Schema({
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

const IngredientReferentiel = mongoose.model(
  'IngredientReferentiel',
  ingredientReferentielSchema
);
export default IngredientReferentiel;
