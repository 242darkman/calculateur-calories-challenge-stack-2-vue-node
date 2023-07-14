import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from '../../controllers/ingredient/ingredient.controller.js';

import { authorize } from '../../guards/auth.guard.js';
import express from 'express';

const router = express.Router();

router.post('/ingredient', authorize, createIngredient);

router.get('/ingredients', authorize, getIngredients);

router.put('/ingredient/:id', authorize, updateIngredient);

router.delete('/ingredient/:id', authorize, deleteIngredient);

export default router;
