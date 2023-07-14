import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controllers/user/user.controller.js';

import { authorize } from '../../guards/auth.guard.js';
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
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   arrivedAt:
 *                     type: string
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.get('/users', authorize, getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 arrivedAt:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.get('/user/:id', getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags:
 *      - User
 *     summary: Update a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 */
router.put('/user/:id', authorize, updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags:
 *      - User
 *     summary: Delete a specific user
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
router.delete('/user/:id', authorize, deleteUser);

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request
 */
router.post(
  '/user',
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
