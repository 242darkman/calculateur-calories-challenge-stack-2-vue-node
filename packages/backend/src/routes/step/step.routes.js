import {
  createStep,
  deleteStep,
  getSteps,
  updateStep,
} from '../../controllers/step/step.controller.js';

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /step:
 *   post:
 *     tags:
 *       - Step
 *     summary: Create a new step
 *     description: Creates a new step for a recipe
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/step', createStep);

/**
 * @swagger
 * /steps:
 *   get:
 *     tags:
 *       - Step
 *     summary: Retrieve all steps
 *     description: Returns all steps for all recipes
 *     responses:
 *       200:
 *         description: An array of steps
 */
router.get('/steps', getSteps);

/**
 * @swagger
 * /step/{id}:
 *   put:
 *     tags:
 *       - Step
 *     summary: Update a specific step by id
 *     description: Updates a specific step for a recipe
 *     parameters:
 *       - name: id
 *         description: Step's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/step/:id', updateStep);

/**
 * @swagger
 * /step/{id}:
 *   delete:
 *     tags:
 *       - Step
 *     summary: Delete a specific step by id
 *     description: Deletes a specific step from a recipe
 *     parameters:
 *       - name: id
 *         description: Step's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/step/:id', deleteStep);

export default router;
