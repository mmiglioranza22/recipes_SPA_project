const { Router } = require('express');
const routerDiet = require('./diet.js')
const routerRecipe = require ('./recipe.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', routerDiet);
router.use('/recipes', routerRecipe);
router.get('/', (req,res)=> {
	res.send('Hola soy la landing page')
})

module.exports = router;
