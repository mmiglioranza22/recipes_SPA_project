const router = require('express').Router();
const axios = require('axios').default;
const { Diet, Recipe } = require('../db.js');
const {getDiets} = require('../controllers/diet')

router.get('/types', getDiets);


module.exports = router;