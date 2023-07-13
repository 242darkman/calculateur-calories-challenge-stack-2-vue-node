import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipeCalories,
  getRecipes,
  updateRecipe,
} from '../../controllers/recipe/recipe.controller.js';

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /recipe:
 *   post:
 *     tags:
 *       - Recipe
 *     description: Creates a new recipe
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/recipe', createRecipe);

/**
 * @swagger
 * /recipes:
 *   get:
 *     tags:
 *       - Recipe
 *     description: Returns all recipes
 *     responses:
 *       200:
 *         description: An array of recipes
 */
router.get('/recipes', getRecipes);

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     description: Returns a single recipe
 *     parameters:
 *       - name: id
 *         description: Recipe's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single recipe
 */
router.get('/recipe/:id', getRecipe);

/**
 * @swagger
 * /recipe/{id}/analyze:
 *   get:
 *     tags:
 *       - Recipe
 *     description: Returns total calories of a recipe
 *     parameters:
 *       - name: id
 *         description: Recipe's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Total calories
 */
router.get('/recipe/:id/analyze', getRecipeCalories);

/**
 * @swagger
 * /recipe/{id}:
 *   put:
 *     tags:
 *       - Recipe
 *     description: Updates a single recipe
 *     parameters:
 *       - name: id
 *         description: Recipe's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/recipe/:id', updateRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     tags:
 *       - Recipe
 *     description: Deletes a single recipe
 *     parameters:
 *       - name: id
 *         description: Recipe's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/recipe/:id', deleteRecipe);

export default router;
