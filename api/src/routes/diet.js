const router = require('express').Router();
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js');


router.get('/types', async (req, res) => {
	// --	GET /types:
	// 					*	Obtener todos los tipos de dieta posibles // OK
	// 					*	En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos // OK
	// 					con los tipos de datos indicados por spoonacular acá
						// tengo que traer las recetas de cada tipo de dieta?	
	let diets = await Diet.findAll();
	res.json(diets)
})


module.exports = router;