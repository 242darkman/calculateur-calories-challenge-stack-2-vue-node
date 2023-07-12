import IngredientReferentiel from '../../models/ingredient/ingredientReferentiel.model.js';
import Recipe from '../../models/recipe/recipe.model.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';

/**
 * récupération de l'ensemble des Recipes
 */
export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Récupérer un seul recipe
 */
export async function getRecipe(req, res) {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (isNull(recipe) || isUndefined(recipe)) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Crée une recette.
 */
export async function createRecipe(req, res) {
  try {
    const recipe = new Recipe(req.body);
    await recipe
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'Recipe created successfully!',
          recipe: result,
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
 * Met à jour une recette.
 */
export async function updateRecipe(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const recipe = await Recipe.findById(id);
    if (isNull(recipe) || isUndefined(recipe)) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    updatedInfo.forEach((update) => (recipe[update] = req.body[update]));
    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * Supprime une recette
 */
export async function deleteRecipe(req, res) {
  try {
    const id = get(req.params, 'id');
    const recipe = await Recipe.findByIdAndRemove(id);
    if (isNull(recipe) || isUndefined(recipe)) {
      return res.status(404).json({ error: 'recipe not found' });
    }
    return res.status(200).json({ message: 'recipe deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * Récupère le nombre total de calories d'une recette.
 */
export async function getRecipeCalories(req, res) {
  try {
    const id = get(req.params, 'id');
    const recipe = await Recipe.findById(id).populate('ingredients.ingredient');

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    let totalCalories = 0;

    for (const ingredient of recipe.ingredients) {
      const ingredientReferentiel = await IngredientReferentiel.findById(
        ingredient.ingredient
      );
      totalCalories += ingredientReferentiel.calories * ingredient.quantity;
    }

    res.status(200).json({ totalCalories });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
