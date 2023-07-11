import {
  login,
  logout,
  me,
  register,
} from '../../controllers/auth/auth.controller.js';

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register user in our application
 *     requestBody:
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
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Connect the user to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User connected successfully
 *       '400':
 *         description: Invalid request
 */
router.post('/auth/login', login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                   example: 'Jackson 5'
 *                 firstName:
 *                   type: string
 *                   description: The user's first name.
 *                   example: 'Fati'
 *                 lastName:
 *                   type: string
 *                   description: The user's last name.
 *                   example: 'Ansumane'
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: 'f.ansu@masia.es'
 *                 arrivedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The user's subscription date.
 *                   example: '2023-06-24T22:37:45.322Z'
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized - User not authenticated
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Bearer token authorization header
 */
router.get('/auth/me', me);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout the user from the application
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Indicates if the user is authenticated.
 *                   example: false
 *                 token:
 *                   type: null
 *                   description: Null value indicating no token.
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized - User not authenticated
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Bearer token authorization header
 */
router.post('/auth/logout', logout);

export default router;
