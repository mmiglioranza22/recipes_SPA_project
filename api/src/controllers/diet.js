const { Diet } = require('../db.js');

async function getDiets(req, res, next) {
	try {
		let diets = await Diet.findAll({
			attributes: ['id', 'name']
		});
		let dietTypes = diets.map( d => d.name)
		res.json(dietTypes);
	} catch (err) {
		next(err);
	};
};

module.exports = {
	getDiets
};