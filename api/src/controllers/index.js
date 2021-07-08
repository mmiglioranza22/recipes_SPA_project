const { Op } = require("sequelize")
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js'); // se importa de db.js porque ahi es donde se leen por fs.readdirSync los archivos de models y se exportan por sequelize.models
const { BASE_URL, URL_FLAGS, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = require('../constants');

async function getRecipes(req,res,next) {
	
}


module.exports = {
	getRecipes
}