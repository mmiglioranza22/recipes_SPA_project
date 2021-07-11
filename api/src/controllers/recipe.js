const { Op } = require("sequelize")
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js');
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');

async function getAllRecipes(req, res, next) {
	let { name } = req.query;
	if (req.query.name) {
		try {
			let recipesDB = await Recipe.findAll({ // no puedo usar sin await y con promise all porque me conctatena la promesa no resuelta.
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
			promiseApi.data.results.forEach(recipe => { // entiendo que no puedo usar promise all abajo, porque tengo que filtrar la informacion de la api antes de devolverla
				let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes } = recipe;
				let result = { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes };
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
			let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } = promiseApi.data; // es spoonacularScore y NO aggregateLikes
			let result = 	{image, title, diets, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } // sino, aca score : aggregateLikes 
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

function editRecipe(req, res, next) {
	const { name } = req.params;
	const edit = req.body;
	return Recipe.update(edit, {
		where: {
			name
		}
	})
		.then(editedRecipe => {
			res.send(editedRecipe)
		})
		.catch(err => next(err))
}

async function deleteRecipe(req, res, next) {
	const name = req.params.name;
	try {
		let existsInDB = await Recipe.findOne({
			where: {
				name,
			}
		});
		if (existsInDB) {
			Recipe.destroy({
				where: {
					name,
				}
			});
			return res.status(200).send('Recipe has been deleted from database successfully')
		}
		else throw new Error('ERROR 500: Recipe with given name does not exist in database')
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getAllRecipes,
	getRecipeById,
	createRecipe,
	editRecipe,
	deleteRecipe
}
