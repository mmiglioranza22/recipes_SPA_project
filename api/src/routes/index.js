const { Router } = require('express');
const axios = require('axios').default;
const routerDiet = require('./diet.js')
const routerRecipe = require('./recipe.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', routerDiet);
router.use('/', routerRecipe);
router.get('/', (req, res) => {

	// Ruta principal: debe contener:
	//  /	Imagen
	// 	/ Nombre
	// 	/ Tipo de dieta(vegetariano, vegano, apto celíaco, etc

	// hacer un request a la api y que me traiga recetas 100 recetas random para ir paginando? no, creo que no
	// primero se hace la query, y en la pagina principal renderizo las recetas
	// DE LO CONTRARIO, meto 10 palabras en un array, se eligen con una funcion random en el indice y se manda la request a la api  con eso
	res.send('Hola soy la landing page')

})

module.exports = router;
