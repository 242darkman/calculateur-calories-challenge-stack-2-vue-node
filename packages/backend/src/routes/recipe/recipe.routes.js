import {
  createRecipe,
  deleteRecipe,
  exportSingleRecipeAsJson,
  generateRecipe,
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
 *     summary: Create a new recipe
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
 *     summary: Retrieve all recipes
 *     description: Returns all recipes
 *     responses:
 *       200:
 *         description: An array of recipes
 */
router.get('/recipes', getRecipes);

/**
 * @swagger
 * /recipe/generate:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Generate a new random recipe
 *     description: This route generates a new random recipe, including ingredients and steps.
 *     responses:
 *       200:
 *         description: Successfully generated a new recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 _id:
 *                   type: 'string'
 *                 title:
 *                   type: 'string'
 *                 author:
 *                   type: 'string'
 *                 publication_date:
 *                   type: 'string'
 *                   format: 'date-time'
 *                 ingredients:
 *                   type: 'array'
 *                   items:
 *                     type: 'object'
 *                     properties:
 *                       _id:
 *                         type: 'string'
 *                       ingredient:
 *                         type: 'string'
 *                       quantity:
 *                         type: 'integer'
 *                       unit:
 *                         type: 'string'
 *                 steps:
 *                   type: 'array'
 *                   items:
 *                     type: 'object'
 *                     properties:
 *                       _id:
 *                         type: 'string'
 *                       title:
 *                         type: 'string'
 *                       description:
 *                         type: 'string'
 *                 __v:
 *                   type: 'integer'
 */
router.get('/recipe/generate', generateRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Retrieve a specific recipe by id
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
 *     summary: Analyze a recipe's total calories
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
 *     summary: Update a specific recipe by id
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
 *     summary: Delete a specific recipe by id
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

/**
 * @swagger
 * /recipe/{id}/json:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Export a specific recipe in JSON format
 *     description: Returns a specific recipe in JSON format
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Recipe's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A recipe in JSON format
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "60c72b4f9f1b2c001f8e4d6a"
 *             title:
 *               type: string
 *               example: "Delicious Salad"
 *             author:
 *               type: string
 *               example: "60c72b4f9f1b2c001f8e4d7a"
 *             publication_date:
 *               type: string
 *               format: date-time
 *               example: "2023-07-13T10:20:30Z"
 *             ingredients:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Tomato"
 *                   quantity:
 *                     type: string
 *                     example: "2 pieces"
 *             steps:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   step_description:
 *                     type: string
 *                     example: "Chop the tomatoes"
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Error
 */
router.get('/recipe/:id/json', exportSingleRecipeAsJson);

export default router;
