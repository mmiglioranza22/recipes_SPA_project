const { Op } = require("sequelize")
const router = require('express').Router();
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');


router.get('/recipes', async (req, res, next) => {

	// --	GET /recipes?name="...":
	// 						*	Obtener un listado de las primeras 9 recetas que contengan la 
	//							palabra ingresada como query parameter // OK, PAGINO EN EL FRONT 
	// 						* Si no existe ninguna receta mostrar un mensaje adecuado // OK

	let { name } = req.query;
	let recipesDB = []; // OJO, ver si conviene no definir
	if (req.query.name) {
		Recipe.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`
				}
			}
		})
			.then(ans => {
				recipesDB = ans;
			})
			.catch(err => next(err));
		try {
			let promiseApi = await axios.get(`${BASE_URL}complexSearch?query=${name}&apiKey=${API_KEY_2}&${URL_FLAGS}`)
			if (!promiseApi.data.results.length && !recipesDB.length) {
				return res.status(404).send(`Your search has ${promiseApi.data.results.length} results`);
			}
			let apiResponse = [];
			promiseApi.data.results.forEach(recipe => {
				let { id, title, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets } = recipe;
				let result = { id, title, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets };
				apiResponse.push(result);
			});

			return res.json(recipesDB.concat(apiResponse)); // al devolver la info, puedo filtrarla desde el front, creo
		} catch (err) {
			next(err);
		}
	}

});

router.get('/recipes/:idReceta', async (req, res, next) => {

	// -	GET /recipes/{idReceta}:
	// 					*	Obtener el detalle de una receta en particular
	// 					*	Debe traer solo los datos pedidos en la ruta de detalle de receta
	// 					*	Incluir los tipos de dieta asociados
	// para identificarla, desde el front tendria que haber un boton que diga (Detail) y al ser clikeado
	// venga a esta ruta y haga una consulta a la api /recipe/{idReceta}/information?apikey
	// y el resultado[0] res.send
	let { idReceta } = req.params;
	if (idReceta.length === 36) {
		try {
			let result = await Recipe.findOne({
				where: {
					id: idReceta
				}
			});
			return res.json(result)
		} catch (err) {
			next(err)
		}
	};
	if (typeof parseInt(idReceta) === 'number') {
		try {
			let promiseApi = await axios.get(`${BASE_URL}${idReceta}/information?apiKey=${API_KEY_2}`);
			if (promiseApi.data.message) res.status(404).send(promiseApi.data);
			let { id, title, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets, instructions } = promiseApi.data;
			let result = { id, title, vegetarian, vegan, glutenFree, dairyFree, sourceUrl, image, diets, instructions };
			return res.json(result)
		} catch (err) {
			next(err);
		}
	}
});

router.post('/recipe', async (req, res, next) => {

	// --	POST /recipe:
	// 					*	Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body // OK, VA POR BODY
	// 					*	Crea una receta en la base de datos // OK LO HACE, VINCULOS TAMBIEN HECHOS

	try {
		let { name, summary, score, healthScore, instructions, dietTypes } = req.body;
		let [recipe, created] = await Recipe.findOrCreate({
			where: {
				name,
				summary,
				score,
				healthScore,
				instructions,
				dietTypes // son numeros. Ver en el front como identificar dietas con numeros (checkbox value=numero!!, formularios, etc)
			}
		});
		if (created) recipe.setDiets(dietTypes);
		res.json(recipe);
	} catch (err) {
		next(err);
	}
});


// ruta put para editar
//ruta delete para borrar
module.exports = router;