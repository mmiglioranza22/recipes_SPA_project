const { Router } = require('express');
const axios = require('axios').default;
const routerDiet = require('./diet.js');
const routerRecipe = require('./recipe.js');

const router = Router();

router.use('/', routerDiet);
router.use('/', routerRecipe);

module.exports = router;
