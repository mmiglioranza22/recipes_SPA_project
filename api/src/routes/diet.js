const router = require('express').Router();
const { Diet } = require('../models/Diet.js');
const { Recipe } = require('../models/Recipe.js');



router.get('/', (req, res) => {
	res.send('hola soy diet')
})


module.exports = router;