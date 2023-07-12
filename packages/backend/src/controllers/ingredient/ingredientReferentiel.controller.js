import get from 'lodash/get.js';
import isUndefined from 'lodash/isUndefined.js';
import isNull from 'lodash/isNull.js';
import IngredientRefentiel from '../../models/ingredient/ingredientRefentiel.model.js';

/**
 * récupération de l'ensemble des ingredients Referentiels
 */
export async function getIngredientReferentiels(req, res) {
  try {
    const ingredients = await IngredientRefentiel.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * création de l'ingredient
 */
export async function createIngredientReferentiel(req, res) {
  try {
    const ingredient = new IngredientRefentiel(req.body);
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
export async function updateIngredientReferentiel(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;
  console.log('id = ' + id);
  try {
    console.log('avant ingr = ' + id);
    const ingredient = await IngredientRefentiel.findById(id);
    console.log('apres ingr = ' + ingredient);
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
export async function deleteIngredientReferentiel(req, res) {
  try {
    const id = get(req.params, 'id');
    const ingredient = await IngredientRefentiel.findByIdAndRemove(id);
    if (isNull(ingredient) || isUndefined(ingredient)) {
      return res.status(404).json({ error: 'ingredient not found' });
    }
    return res.status(200).json({ message: 'ingredient deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**Recup à partir de l'id */
export async function getReferentiel(req, res) {
  const id = get(req.params, 'id');
  try {
    const referentiel = await IngredientRefentiel.findById(id);
    if (isNull(referentiel) || isUndefined(referentiel)) {
      res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(referentiel);
  } catch (error) {}
}
