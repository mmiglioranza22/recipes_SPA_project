const { Op } = require("sequelize")
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');

async function getAllRecipes(req, res, next) {
	let { name } = req.query;
	if (req.query.name) {
		try {
			let recipesDB = await Recipe.findAll({ 
				where: {
					name: {
						[Op.iLike]: `%${name}%`
					}
				},
				attributes:['name', 'summary', 'score', 'healthScore', 'instructions'],
				include: {
					model: Diet,
					attributes: ['name']
				}
			}); // no puedo filtrar la junction table

			let promiseApi = await axios.get(`${BASE_URL}complexSearch?query=${name}&apiKey=${API_KEY_3}&${URL_FLAGS}`)
			if (!promiseApi.data.results.length && !recipesDB.length) {
				return res.status(404).send(`Your search has ${promiseApi.data.results.length} results`);
			}
			let apiResponse = [];
			promiseApi.data.results.forEach(recipe => {
				let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree } = recipe; // por interpretacion, faltaria dishTypes(array)
				let result = { image, title, diets, vegetarian, vegan, glutenFree, dairyFree };
				apiResponse.push(result);
			});

			// si quiero filtrar dietType (dato redundante, ya me viene por el join), es acá donde tengo que filtrarlo,
			// recipesDB = {...recipesDB, delete dietType} o algo asi, asignar todo menos el dietType a un nuevo objeto y devolver este ultimo
			// ver mas adelante con el front
			res.json(recipesDB.concat(apiResponse)); // al devolver la info, puedo filtrarla desde el front, creo
		} catch (err) {
			next(err);
		}
	}

};

async function getRecipeById(req, res, next) {
	let { idReceta } = req.params;
	if (idReceta && idReceta.length === 36) {
		try {
			let result = await Recipe.findOne({
				where: {
					id: idReceta
				},
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt', 'dietTypes']
				},
				include: {
					model: Diet,
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt']
					},
				}
			});
			if (result) {
				return res.json(result)
			} else {
				return res.status(404).json({
					status: 404,
					code: 0,
					message: "We're so sorry, something went wrong.",
					link: null,
					infoDev: 'Id requested not found in database',
				});
			}
		} catch (err) {
			next(err)
		};
	};
	if (/^[^A-Za-z]+$/i.test(idReceta)) {
		let promiseApi;
		try {
			promiseApi = await axios.get(`${BASE_URL}${idReceta}/information?apiKey=${API_KEY_3}`);
			let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, summary, spoonacularScore, healthScore, instructions } = promiseApi.data;
			let result = { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, summary, spoonacularScore, healthScore, instructions };
			return res.json(result)
		} catch (err) {
			return res.status(404).json({
				...err.response.data, infoDev: 'Id requested not found in API'
			})
		}
	};
};

async function createRecipe(req, res, next) {
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
		return res.json(recipe);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getAllRecipes,
	getRecipeById,
	createRecipe
}
