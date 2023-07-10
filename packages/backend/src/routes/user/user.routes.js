import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controllers/user/user.controller.js';

import { body } from 'express-validator';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.get('/users/:id', getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *      - User
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.put('/users/:id', updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *      - User
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.delete('/users/:id', deleteUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *      - User
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request
 */
router.post(
  '/users',
  [
    body('userName').notEmpty().withMessage('User name is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  createUser
);

export default router;
