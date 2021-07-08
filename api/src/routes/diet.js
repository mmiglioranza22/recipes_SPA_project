const router = require('express').Router();
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js');
const {getDiets} = require('../controllers/diet')

router.get('/types', getDiets);
// --	GET /types:
	// 					*	Obtener todos los tipos de dieta posibles // OK, son los precargados en el array
	// 					*	En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos // OK
	// 						con los tipos de datos indicados por spoonacular acá  // tengo que traer las recetas de cada tipo de dieta?	


module.exports = router;