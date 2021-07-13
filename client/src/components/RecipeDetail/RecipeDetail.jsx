import React from 'react';
import { NavLink } from 'react-router-dom';

// Ruta de detalle de receta: debe contener

//  Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
//  Resumen del plato
//  Puntuación
//  Nivel de "comida saludable"
//  Paso a paso

//este componente consume el state del store (recipeDetail), useSelector o mapStateToProps y connect
// de alguna forma tengo que consumir el id que viene por match.params

//donde disparo la accion GET_DETAIL? tendria que ser un boton navlink 'detail' que se mapee en cada recipecard. Ver hw weather


// consume store recipeDetail y 
//ver si useEffect va aca

export default function RecipeDetail() {
	return (
		<div className='detail'>
			<div>Recipe Details will be shown here</div>
			<NavLink to='/home'>Home</NavLink>
		</div>
	)
};