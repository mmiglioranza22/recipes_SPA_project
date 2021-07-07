const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');

async function getAllRecipes (req, res, next) {

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
			promiseApi = await axios.get(`${BASE_URL}?query=${name}&apiKey=${API_KEY_2}&${URL_FLAGS}`);
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
}