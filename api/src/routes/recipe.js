require('dotenv').config()
const router = require('express').Router();
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = process.env;



router.get('/recipes', async (req, res, next) => {

	// --	GET /recipes?name="...":
	// 						*	Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter
	// 						* Si no existe ninguna receta mostrar un mensaje adecuado
	
	let { query } = req.query;
	let promiseApi; // va a ser un array
	if (req.query.query) {
		try {
			promiseApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY_1}&number=1&addRecipeInformation=true`)
			if (!apiResponse.data.results.length) {
				return res.send(`Your search has ${apiResponse.data.results.length} results`)
			} else {
				let apiResponse =  promiseApi.data.results[0];
				let { id, title, summary, spoonacularScore, healthScore, analyzedInstructions, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets } = recipe;
					return  Recipe.create({ id, title, summary, spoonacularScore, healthScore, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, 
																	dietArray: diets,
																	analyzedInstructions: analyzedInstructions.steps,
					})
			
				Promise.all([promises])
				.catch(err => {
					next(err)
				})
				console.log('recipes insertadas en DB')
				//console.log(apiResponse.data.results)
				return res.json('Recipe de la API creada en DB')
			}
		} catch (err) {
			console.log(err);
		}
	}
	res.send('hola soy recipe')
})


router.get('/recipes/:idReceta', (req, res) => {

	// -	GET /recipes/{idReceta}:
	// 					*	Obtener el detalle de una receta en particular
	// 					*	Debe traer solo los datos pedidos en la ruta de detalle de receta
	// 					*	Incluir los tipos de dieta asociados
		// para identificarla, desde el front tendria que haber un boton que diga (Detail) y al ser clikeado
		// venga a esta ruta y haga una consulta a la api /recipe/{idReceta}/information?apikey
		// y el resultado[0] res.send


	res.send('hola soy recipe')
})

router.post('/recipe', (req, res) => {

	// --	POST /recipe:
	// 					*	Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
	// 					*	Crea una receta en la base de datos
	res.send('hola soy recipe')

})


module.exports = router;