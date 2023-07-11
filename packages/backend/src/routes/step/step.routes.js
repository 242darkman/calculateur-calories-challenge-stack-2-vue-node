import {
  createStep,
  getSteps,
  updateStep,
  deleteStep,
} from '../../controllers/Step/Step.controller.js';

import express from 'express';

const router = express.Router();

router.post('/step', createStep);

router.get('/steps', getSteps);

router.put('/step/:id', updateStep);

router.delete('/step/:id', deleteStep);

export default router;
