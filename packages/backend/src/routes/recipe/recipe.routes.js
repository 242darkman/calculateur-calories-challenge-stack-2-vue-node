import {
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} from '../../controllers/recipe/recipe.controller.js';

import express from 'express';

const router = express.Router();

router.post('/recipe', createRecipe);

router.get('/recipes', getRecipes);

router.put('/recipe/:id', updateRecipe);

router.delete('/recipe/:id', deleteRecipe);

export default router;
