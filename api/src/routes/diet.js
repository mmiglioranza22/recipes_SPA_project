const router = require('express').Router();
const axios = require('axios').default;
const { Diet } = require('../models/Diet.js');
const { Recipe } = require('../models/Recipe.js');



router.get('/types', (req, res) => {
	// --	GET /types:
	// 					*	Obtener todos los tipos de dieta posibles
	// 					*	En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos 
	// 					con los tipos de datos indicados por spoonacular acá	
	res.send('hola soy diet')
})


module.exports = router;