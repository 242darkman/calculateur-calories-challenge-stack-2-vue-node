import Ingredient from '../../models/ingredient/ingredient.model.js';
import get from 'lodash/get.js';
import isUndefined from 'lodash/isUndefined.js';
import isNull from 'lodash/isNull.js';

/**
 * récupération de l'ensemble des ingredients
 */
export async function getIngredients(req, res) {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * création de l'ingredient
 */
export async function createIngredient(req, res) {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'Ingredient created successfully!',
          ingredient: result,
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
 * MAJ ingredient
 */
export async function updateIngredient(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    updatedInfo.forEach((update) => (ingredient[update] = req.body[update]));
    await ingredient.save();

    res.status(200).json(ingredient);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * DELETE ingredient
 */
export async function deleteIngredient(req, res) {
  try {
    const id = get(req.params, 'id');
    const ingredient = await Ingredient.findByIdAndRemove(id);
    if (isNull(ingredient) || isUndefined(ingredient)) {
      return res.status(404).json({ error: 'ingredient not found' });
    }
    return res.status(200).json({ message: 'ingredient deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}
