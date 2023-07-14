import {
  createIngredientReferentiel,
  deleteIngredientReferentiel,
  getIngredientReferentiels,
  getReferentiel,
  updateIngredientReferentiel,
} from '../../controllers/ingredient/ingredientReferentiel.controller.js';

import { authorize } from '../../guards/auth.guard.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/ingredientReferentiel:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [IngredientReferentiel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - calories
 *               - proteines
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the ingredient
 *               calories:
 *                 type: string
 *                 format: decimal
 *                 description: The calories of the ingredient
 *               proteines:
 *                 type: string
 *                 format: decimal
 *                 description: The proteines of the ingredient
 *     responses:
 *       201:
 *         description: The ingredient was successfully created
 *       500:
 *         description: Something went wrong
 */
router.post('/ingredientReferentiel', authorize, createIngredientReferentiel);

/**
 * @swagger
 * /api/ingredientReferentiels:
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
 * /api/ingredientReferentiel/{id}:
 *   get:
 *     summary: Retrieve specific ingredient
 *     tags: [IngredientReferentiel]
 *     responses:
 *       200:
 *         description: The list of all ingredients
 *       500:
 *         description: Something went wrong
 */
router.get('/ingredientReferentiel/:id', authorize, getReferentiel);

/**
 * @swagger
 * /api/ingredientReferentiel/{id}:
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
 *             type: object
 *             required:
 *               - name
 *               - calories
 *               - proteines
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the ingredient
 *               calories:
 *                 type: string
 *                 format: decimal
 *                 description: The calories of the ingredient
 *               proteines:
 *                 type: string
 *                 format: decimal
 *                 description: The proteines of the ingredient
 *     responses:
 *       200:
 *         description: The ingredient was successfully updated
 *       400:
 *         description: The ingredient was not found
 *       500:
 *         description: Something went wrong
 */
router.put(
  '/ingredientReferentiel/:id',
  authorize,
  updateIngredientReferentiel
);

/**
 * @swagger
 * /api/ingredientReferentiel/{id}:
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
router.delete(
  '/ingredientReferentiel/:id',
  authorize,
  deleteIngredientReferentiel
);

export default router;
