import {
  createStep,
  deleteStep,
  getSteps,
  updateStep,
} from '../../controllers/step/step.controller.js';

import { authorize } from '../../guards/auth.guard.js';
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/step', authorize, createStep);
router.post('/step', authorize, createStep);

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
router.get('/steps', authorize, getSteps);

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
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/step/:id', authorize, updateStep);

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
router.delete('/step/:id', authorize, deleteStep);

export default router;
