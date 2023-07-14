import Step from '../../models/step/step.model.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';

const stepTitles = [
  'Préparer les ingrédients',
  'Mélanger les ingrédients',
  'Cuire le mélange',
  'Laisser refroidir',
  'Servir le plat',
];

const stepDescriptions = [
  'Sortez tous les ingrédients nécessaires et préparez-les pour le processus de cuisson.',
  'Mettez tous les ingrédients dans un grand bol et mélangez-les soigneusement.',
  'Mettez le mélange sur le feu et faites cuire pendant 30 minutes.',
  'Retirez le plat du feu et laissez-le refroidir un moment.',
  "Servez le plat pendant qu'il est encore chaud.",
];

/**
 * récupération de l'ensemble des step
 */
export async function getSteps(req, res) {
  try {
    const step = await Step.find();
    res.status(200).json(step);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * création de la recette
 */
export async function createStep(req, res) {
  try {
    const step = new Step(req.body);
    await step
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'Step created successfully!',
          step: result,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.toString() });
      });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**  *
 * MAJ step
 */
export async function updateStep(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const step = await Step.findById(id);
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }

    updatedInfo.forEach((update) => (step[update] = req.body[update]));
    await step.save();

    res.status(200).json(step);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * DELETE step
 */
export async function deleteStep(req, res) {
  try {
    const id = get(req.params, 'id');
    const step = await Step.findByIdAndRemove(id);
    if (isNull(step) || isUndefined(step)) {
      return res.status(404).json({ error: 'step not found' });
    }
    return res.status(200).json({ message: 'step deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

export async function getRandomStep() {
  const randomTitleIndex = Math.floor(Math.random() * stepTitles.length);
  const randomDescriptionIndex = Math.floor(
    Math.random() * stepDescriptions.length
  );

  const step = new Step({
    title: stepTitles[randomTitleIndex],
    description: stepDescriptions[randomDescriptionIndex],
  });

  await step.save();

  return step;
}

export function formatSteps({ steps }) {
  return steps.map((step) => {
    return {
      title: step.title,
      description: step.description,
    };
  });
}
