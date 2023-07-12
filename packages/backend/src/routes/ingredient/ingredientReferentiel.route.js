import {
  createIngredientReferentiel,
  getIngredientReferentiels,
  updateIngredientReferentiel,
  deleteIngredientReferentiel,
  getReferentiel,
  exportIngredient,
} from '../../controllers/ingredient/ingredientReferentiel.controller.js';

import express from 'express';

const router = express.Router();

router.post('/ingredientReferentiel', createIngredientReferentiel);

router.get('/ingredientReferentiels', getIngredientReferentiels);

router.get('/ingredientReferentiel/:id', getReferentiel);

router.get('/export/:id', exportIngredient);

router.put('/ingredientReferentiel/:id', updateIngredientReferentiel);

router.delete('/ingredientReferentiel/:id', deleteIngredientReferentiel);

export default router;
