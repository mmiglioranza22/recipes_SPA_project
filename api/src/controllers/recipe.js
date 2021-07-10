const { Op } = require("sequelize")
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js');
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
				attributes: ['name', 'summary', 'score', 'healthScore', 'instructions'],
				include: {
					model: Diet,
					attributes: ['name']
				}
			}); 

			let promiseApi = await axios.get(`${BASE_URL}complexSearch?query=${name}&apiKey=${API_KEY_3}&${URL_FLAGS}`)
			if (!promiseApi.data.results.length && !recipesDB.length) {
				return res.status(404).send(`Your search has ${promiseApi.data.results.length} results`);
			}
			let apiResponse = [];
			promiseApi.data.results.forEach(recipe => {
				let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree } = recipe;
				let result = { image, title, diets, vegetarian, vegan, glutenFree, dairyFree };
				apiResponse.push(result);
			});
			res.json(recipesDB.concat(apiResponse));
		} catch (err) {
			next(err);
		}
	}

};

async function getRecipeById(req, res, next) {
	let { idReceta } = req.params;
	if (/^[^A-Za-z]+$/i.test(idReceta)) {
		let promiseApi;
		try {
			promiseApi = await axios.get(`${BASE_URL}${idReceta}/information?apiKey=${API_KEY_3}`);
			let result = promiseApi.data;
			return res.json(result)
		} catch (err) {
			return next(err) // tengo que hacer return sino sigue la ejecucion y matchea el ultimo if
		}
	};
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
			if (result) res.json(result)
			else throw new Error('ERROR 500: Recipe not found in database (UUID does not exist).');
		} catch (err) {
			next(err)
		};
	} 
	if (idReceta && idReceta.length !== 36 ){ // llega aca si y solo si no era un uuid valido. Tampoco si eran solo numeros, porque se retorno el next dentro del catch en el primer if
		try {
		throw new TypeError('ERROR 404: Invalid Id (Id is not a valid UUID type nor valid integer type).')
		} catch (err) {
			next(err)
		}	
	}
		;

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
				dietTypes
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
