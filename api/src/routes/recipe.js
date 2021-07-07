require('dotenv').config();
const { Op } = require("sequelize")
const router = require('express').Router();
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = process.env;



router.get('/recipes', async (req, res, next) => {

	// --	GET /recipes?name="...":
	// 						*	Obtener un listado de las primeras 9 recetas que contengan la 
	//							palabra ingresada como query parameter // OK, PAGINO EN EL FRONT 
	// 						* Si no existe ninguna receta mostrar un mensaje adecuado // OK

	let { name } = req.query;
	let promiseApi = []; // va a ser un array de maximo 100 recetas
	let recipesDB = [];
	if (req.query.name) {
		Recipe.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`
				}
			}
		})
			.then(ans => {
				recipesDB.push(ans);
			})
			.catch(err => next(err));
		try {
			promiseApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY_2}&number=100&addRecipeInformation=true`)
			if (!promiseApi.data.results.length && !recipesDB.length) {
				return res.status(404).send(`Your search has ${promiseApi.data.results.length} results`);
			} 
			let apiResponse = [];
			promiseApi.data.results.forEach(recipe => {
				let { id, title, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image } = recipe;
				let result = { id, title, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image };
				apiResponse.push(result);
			});
	
			return res.json(recipesDB.concat(apiResponse));
		} catch (err) {
			next(err);
		}
	}

})


router.get('/recipes/:idReceta', (req, res) => {

	// -	GET /recipes/{idReceta}:
	// 					*	Obtener el detalle de una receta en particular
	// 					*	Debe traer solo los datos pedidos en la ruta de detalle de receta
	// 					*	Incluir los tipos de dieta asociados
	// para identificarla, desde el front tendria que haber un boton que diga (Detail) y al ser clikeado
	// venga a esta ruta y haga una consulta a la api /recipe/{idReceta}/information?apikey
	// y el resultado[0] res.send

	let apiResponse = promiseApi.data.results[0];
	let { id, title, summary, spoonacularScore, healthScore, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets } = recipe;
	let result = { id, title, summary, spoonacularScore, healthScore, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets };
	//crear un objeto donde guardo las cosas que me trae la api
	// NO HACE FALTA ! --> pushear el en una variable array instrucciones las apiresponse.analyzedInstructions.map(e => e.steps) o algo asi, despues joinearlo en un unico string
	// y ahi recien ahi meterlo en el objeto creado anteriormente
	// filtrar con regex el summary antes de mandarlo (sacarles los tags) 
	// res.json(objeto) y en el front lo presentamos

	res.send('hola soy recipe')
})

router.post('/recipe', (req, res, next) => {

	// --	POST /recipe:
	// 					*	Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
	// 					*	Crea una receta en la base de datos
	// findOrCreate, si el segundo argumento es true, 'Choose another name for your recipe'
	// el find tiene que buscar por name.toLowerCase === body.name.toLowerCase
	// si es false, la crea y hace un redirect a la receta || 'Your recipe {recipe.name} has been created!, The recipe id is {recipe.id}'
	let { name, summary, score, healthScore, instructions } = req.body;
	let newRecipe = { name, summary, score, healthScore, instructions };

	console.log(req.body)
	Recipe.findOrCreate({
		where : {
			name,
			summary,
			score,
			healthScore,
			instructions
		}
	})

	res.send('recipe post route: recipe creada en DB')

})

// ruta put para editar
//ruta delete para borrar
module.exports = router;