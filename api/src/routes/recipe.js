const router = require('express').Router();
const { getAllRecipes, getRecipeById, createRecipe } = require('../controllers/recipe');

router.get('/recipes', getAllRecipes);

//  GET /recipes?name="...":
// Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

// Imagen // ok
// Nombre // ok
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc) // ok

router.get('/recipes/:idReceta', getRecipeById);

//  GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular // OK
// Debe traer solo los datos pedidos en la ruta de detalle de receta // OK, HECHO
// Incluir los tipos de dieta asociados // OK, HECHO EN EL ANTERIOR

		// Ruta de detalle de receta: debe contener

		//  Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta) // tdp debe ser gluten free y eso
		//  Resumen del plato // ok
		//  Puntuación // ok
		//  Nivel de "comida saludable" // ok
		//  Paso a paso  // ok


router.post('/recipe', createRecipe);
//  POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body // OK HECHO
// Crea una receta en la base de datos // OK HECHO, Y LE VINCULA EL TIPO DE DIETA



// ruta put para editar
//ruta delete para borrar
module.exports = router;