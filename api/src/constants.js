require('dotenv').config();

const { API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5 } = process.env;
const BASE_URL = 'https://api.spoonacular.com/recipes/';
const URL_FLAGS = 'number=9&addRecipeInformation=true';

module.exports = {
	BASE_URL,
	URL_FLAGS,
	API_KEY_1,
	API_KEY_2,
	API_KEY_3,
	API_KEY_4,
	API_KEY_5
}