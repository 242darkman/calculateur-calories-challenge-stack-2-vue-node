import {
  createIngredientReferentiel,
  deleteIngredientReferentiel,
  getIngredientReferentiels,
  updateIngredientReferentiel,
  deleteIngredientReferentiel,
  getReferentiel,
  exportIngredient,
} from '../../controllers/ingredient/ingredientReferentiel.controller.js';

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /ingredientReferentiel:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [IngredientReferentiel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientReferentiel'
 *     responses:
 *       201:
 *         description: The ingredient was successfully created
 *       500:
 *         description: Something went wrong
 */
router.post('/ingredientReferentiel', createIngredientReferentiel);

/**
 * @swagger
 * /ingredientReferentiels:
 *   get:
 *     summary: Retrieve all ingredients
 *     tags: [IngredientReferentiel]
 *     responses:
 *       200:
 *         description: The list of all ingredients
 *       500:
 *         description: Something went wrong
 */
router.get('/ingredientReferentiels', getIngredientReferentiels);

/**
 * @swagger
 * /ingredientReferentiel/{id}:
 *   put:
 *     summary: Update a specific ingredient
 *     tags: [IngredientReferentiel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientReferentiel'
 *     responses:
 *       200:
 *         description: The ingredient was successfully updated
 *       400:
 *         description: The ingredient was not found
 *       500:
 *         description: Something went wrong
 */
router.get('/ingredientReferentiel/:id', getReferentiel);

router.get('/export/:id', exportIngredient);

router.put('/ingredientReferentiel/:id', updateIngredientReferentiel);

/**
 * @swagger
 * /ingredientReferentiel/{id}:
 *   delete:
 *     summary: Delete a specific ingredient
 *     tags: [IngredientReferentiel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to delete
 *     responses:
 *       200:
 *         description: The ingredient was successfully deleted
 *       404:
 *         description: The ingredient was not found
 *       500:
 *         description: Something went wrong
 */
router.delete('/ingredientReferentiel/:id', deleteIngredientReferentiel);

export default router;
