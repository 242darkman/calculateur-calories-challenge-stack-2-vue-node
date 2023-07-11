import {
  createIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
} from '../../controllers/ingredient/ingredient.controller.js';

import express from 'express';

const router = express.Router();

router.post('/ingredient', createIngredient);

router.get('/ingredients', getIngredients);

router.put('/ingredient/:id', updateIngredient);

router.delete('/ingredient/:id', deleteIngredient);

export default router;
