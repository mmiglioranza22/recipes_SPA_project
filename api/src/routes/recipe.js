const router = require('express').Router();
const { getAllRecipes, getRecipeById, createRecipe, editRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipe');

router.get('/recipes', getAllRecipes);


router.get('/recipes/:idReceta', getRecipeById);


router.post('/recipe', createRecipe);


//--not required--

router.put('/recipes/:id', updateRecipe);

router.delete('/recipes/:id', deleteRecipe);

module.exports = router;