const { Op } = require("sequelize")
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js');
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');

async function getDiets(req, res, next) {
	try {
		let diets = await Diet.findAll();
		res.json(diets);

		// es necesario asociarles las recipes? entiendo que no porque ya lo hace setDiets en createRecipe
		// hay que hacer un createDiets? README habla de 'En un principio..', pero desde el vamos se cargan todas las dietas posibles, las del array!
	} catch (err) {
		next(err);
	}
}


module.exports = {
	getDiets
}