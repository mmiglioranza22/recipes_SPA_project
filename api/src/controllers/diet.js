const { Diet } = require('../db.js');

async function getDiets(req, res, next) {
	try {
		let diets = await Diet.findAll({
			attributes: ['id', 'name']
		});
		res.json(diets);
	} catch (err) {
		next(err);
	};
};

module.exports = {
	getDiets
};