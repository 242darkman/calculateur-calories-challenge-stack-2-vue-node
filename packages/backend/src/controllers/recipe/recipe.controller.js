import { formatSteps, getRandomStep } from '../step/step.controller.js';

import Ingredient from '../../models/ingredient/ingredient.model.js';
import IngredientReferentiel from '../../models/ingredient/ingredientReferentiel.model.js';
import Recipe from '../../models/recipe/recipe.model.js';
import { createBotUser } from '../user/user.controller.js';
import { formatIngredients } from '../ingredient/ingredient.controller.js';
import fs from 'fs';
import get from 'lodash/get.js';
import { getOrCreateIngredient } from '../ingredient/ingredientReferentiel.controller.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';
import os from 'os';
import path from 'path';

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

/**
 * export d'une recette au format json
 */
export async function exportSingleRecipeAsJson(req, res) {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'recipe not found' });
    }

    const exportData = JSON.stringify(recipe, null, 2);
    const fileName = `recipe.json`;

    const tempFilePath = path.join(os.tmpdir(), fileName);

    fs.writeFileSync(tempFilePath, exportData, 'utf-8');

    res.download(tempFilePath, fileName, (err) => {
      if (err) {
        res
          .status(500)
          .json({ error: 'Error downloading file: ' + err.toString() });
      }

      // Supprimer le fichier temporaire après le téléchargement
      fs.unlinkSync(tempFilePath);
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function generateRecipe(req, res) {
  try {
    const user = await createBotUser();

    const steps = [];
    for (let i = 0; i < 5; i++) {
      const step = await getRandomStep();
      steps.push(step);
    }

    const formattedSteps = formatSteps({ steps });

    const ingredients = [];
    for (let i = 0; i < 3; i++) {
      const ingredientReferentiel = await getOrCreateIngredient({
        name: 'ingredient' + i,
        calories: Math.random() * 500,
        proteines: Math.random() * 100,
      });
      const ingredient = new Ingredient({
        ingredient: ingredientReferentiel._id,
        quantity: Math.floor(Math.random() * 200) + 1,
        unit: 'g',
      });
      await ingredient.save();
      ingredients.push(ingredient);
    }
    const formattedIngredients = formatIngredients({ ingredients });

    const recipe = new Recipe({
      title: 'Random Recipe',
      author: user._id,
      ingredients: formattedIngredients,
      steps: formattedSteps,
    });

    await recipe.save();
    return res.status(200).send(recipe);
  } catch (error) {
    console.error('An error occurred while creating a random recipe:', error);
    throw error;
  }
}
