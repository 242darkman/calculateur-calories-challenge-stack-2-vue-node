import IngredientReferentiel from '../../models/ingredient/ingredientReferentiel.model.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';

/**
 * Récupère tous les ingrédients du Référentiel.
 */
export async function getIngredientReferentiels(req, res) {
  try {
    let ingredients = await IngredientReferentiel.find();

    // Conversion des valeurs Decimal128 en Number
    ingredients = ingredients.map((doc) => {
      const ingredient = doc.toObject();
      ingredient.calories = parseFloat(ingredient.calories.toString());
      ingredient.proteines = parseFloat(ingredient.proteines.toString());
      return ingredient;
    });

    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Crée un nouvel ingrédient dans le Référentiel.
 */
export async function createIngredientReferentiel(req, res) {
  try {
    const ingredient = new IngredientReferentiel(req.body);
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

/**
 * Met à jour un ingrédient existant dans le Référentiel.
 */
export async function updateIngredientReferentiel(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;
  try {
    const ingredient = await IngredientReferentiel.findById(id);
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
 * Supprime un ingrédient spécifique du Référentiel.
 */
export async function deleteIngredientReferentiel(req, res) {
  try {
    const id = get(req.params, 'id');
    const ingredient = await IngredientReferentiel.findByIdAndRemove(id);
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
    const referentiel = await IngredientReferentiel.findById(id);
    if (isNull(referentiel) || isUndefined(referentiel)) {
      res.status(404).json({ error: 'ingredient not found' });
    }
    res.status(200).json(referentiel);
  } catch (error) {}
}

export async function getRandomIngredient() {
  const count = await IngredientReferentiel.countDocuments();
  const random = Math.floor(Math.random() * count);
  return await IngredientReferentiel.findOne().skip(random);
}

export async function getOrCreateIngredient({ name, calories, proteines }) {
  const ingredient = await IngredientReferentiel.findOne({ name });
  if (!ingredient) {
    const newIngredient = await getRandomIngredient();
    if (!newIngredient) {
      const ingredientCreate = new IngredientReferentiel({
        name,
        calories,
        proteines,
      });
      await ingredientCreate.save();
      return ingredientCreate;
    }
    return newIngredient;
  }
  return ingredient;
}
