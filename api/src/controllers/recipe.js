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
				attributes: ['id', ['name', 'title'], 'summary', 'score', 'healthScore', 'instructions', ['dietTypes', 'diets']],
			});
			let promiseApi = await axios.get(`${BASE_URL}complexSearch?query=${name}&apiKey=${API_KEY_5}&${URL_FLAGS}`)
			if (!promiseApi.data.results.length && !recipesDB.length) {
				throw new Error ('ERROR 500: Your search has 0 results');
			}
			let apiResponse = [];
			promiseApi.data.results.forEach(recipe => {
				let { id, image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes, spoonacularScore } = recipe;
				let result = { id, image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes, score: spoonacularScore };
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
			promiseApi = await axios.get(`${BASE_URL}${idReceta}/information?apiKey=${API_KEY_5}`);
			let { id, image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } = promiseApi.data; // es spoonacularScore y NO aggregateLikes
			let result = 	{ id, image, title, dietTypes: diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } // sino, aca score : aggregateLikes 
			return res.json(result)
		} catch (err) {
			return next(err)
		}
	};
	if (idReceta && idReceta.length === 36) {
		try {
			let result = await Recipe.findOne({
				where: {
					id: idReceta
				},
				attributes: ['id', ['name', 'title'], 'summary', ['score', 'spoonacularScore'], 'healthScore', 'instructions', 'dietTypes'],
				include: {
					model: Diet,
					attributes: ['name']
				}
			});
			if (result) res.json(result)
			else throw new Error('ERROR 500: Recipe not found in database (UUID does not exist).');
		} catch (err) {
			next(err)
		};
	}
	if (idReceta && idReceta.length !== 36) {
		try {
			throw new TypeError('ERROR 404: Invalid Id (Id is not a valid UUID type nor valid integer type).')
		} catch (err) {
			next(err)
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
				dietTypes
			}
		});
		if (created) recipe.setDiets(dietTypes);
		return res.json(recipe);
	} catch (err) {
		next(err);
	}
};

//--not required--

function updateRecipe(req, res, next) {
	const { id } = req.params;
	const changes = req.body;
	return Recipe.update(changes, {
		where: {
			id
		}
	})
		.then(updatedRecipe => { // no puedo ver si en la response a .update me devuelve en algun lado la receta modificada?
			res.send(updatedRecipe) // de lo contrario, tendria que hacer una call a createRecipe() que me busca la receta que acabo de modificar y me la devuelve, y a eso hacer res.send
		})												// o simplemente devolver lo que recibi por req.body
		.catch(err => next(err))
};

async function deleteRecipe(req, res, next) {
	const {id} = req.params;
	try {
		let existsInDB = await Recipe.findOne({
			where: {
				id,
			}
		});
		if (existsInDB) {
			Recipe.destroy({
				where: {
					id,
				}
			});
			return res.status(200).send('Recipe has been deleted from database successfully') // lo mismo que updateRecipe, ver si me devuelve en algun lado la receta borrada, 
		}																																										// sino invocar createRecipe() o devolver el id
		else throw new Error('ERROR 500: Recipe with given name does not exist in database')
	} catch (err) {
		next(err)
	}
};

module.exports = {
	getAllRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe
};
