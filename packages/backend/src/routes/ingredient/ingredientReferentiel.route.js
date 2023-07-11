import {
  createIngredientReferentiel,
  getIngredientReferentiels,
  updateIngredientReferentiel,
  deleteIngredientReferentiel,
} from '../../controllers/ingredient/ingredientReferentiel.controller.js';

import express from 'express';

const router = express.Router();

router.post('/ingredientReferentiel', createIngredientReferentiel);

router.get('/ingredientReferentiels', getIngredientReferentiels);

router.put('/ingredientReferentiel/:id', updateIngredientReferentiel);

router.delete('/ingredientReferentiel/:id', deleteIngredientReferentiel);

export default router;
