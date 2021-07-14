const { Router } = require('express');
const axios = require('axios').default;
const routerDiet = require('./diet.js');
const routerRecipe = require('./recipe.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', routerDiet);
router.use('/', routerRecipe);

module.exports = router;
