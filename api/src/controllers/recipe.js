const { Op } = require("sequelize")
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');

async function getAllRecipes(req, res, next) {
	let { name } = req.query;
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
				let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree } = recipe; // por interpretacion, faltaria dishTypes(array)
				let result = { image, title, diets, vegetarian, vegan, glutenFree, dairyFree };
				apiResponse.push(result);
			});

			return res.json(recipesDB.concat(apiResponse)); // al devolver la info, puedo filtrarla desde el front, creo
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
				}
			});
			if (result) {
				return res.json(result)
			} else {
				return res.status(404).json({
					status: 404,
					code: 0,
					message: "We're so sorry, something went wrong. If this error persists, please contact us.",
					link: null,
					infoDev: 'Id requested not found in database',
				});
			}
		} catch (err) { // este catch estaria de mas, ya estoy controlando si el findOne me devuelve [] en el else
			next(err)
		};
	};
	if (/^[^A-Za-z]+$/i.test(idReceta)) { // regex para testear que idReceta sea unicamente un numero, sin caracteres en ningun lado
		// parseInt no funcionaba si habia caracteres despues del numero!
		let promiseApi;
		try {
			promiseApi = await axios.get(`${BASE_URL}${idReceta}/information?apiKey=${API_KEY_2}`);
			let { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, summary, spoonacularScore, healthScore, instructions } = promiseApi.data;
			let result = { image, title, diets, vegetarian, vegan, glutenFree, dairyFree, summary, spoonacularScore, healthScore, instructions };
			return res.json(result)
		} catch (err) {
			console.log('DEMASIADOS NUMEROOOOOOOOOS---------------')
			//next(err) // pasa el error y lo consologea al final desde el endware de app.js, pero lo pasa de esa forma concreta
			// si quiero manejarlo aca, no tengo que usar next
			return res.status(404).json({
				...err.response.data, infoDev: 'Id requested not found in API'})
		}
	};

	// res.status(404).send('Invalid id: Recipe Id must be a number') no haria falta, los cases estan cubiertos

	
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
		res.json(recipe);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getAllRecipes,
	getRecipeById,
	createRecipe
}
