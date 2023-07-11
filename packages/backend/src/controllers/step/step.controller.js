import Step from '../../models/step/step.model.js';
import get from 'lodash/get.js';
import isUndefined from 'lodash/isUndefined.js';
import isNull from 'lodash/isNull.js';

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
