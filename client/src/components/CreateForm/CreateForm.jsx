import React from 'react';
import { NavLink } from 'react-router-dom';

// Ruta de creación de recetas: debe contener

//  Un formulario controlado con los siguientes campos
// Nombre
// Resumen del plato
// Puntuación
// Nivel de "comida saludable"
// Paso a paso
//  Posibilidad de seleccionar/agregar uno o más tipos de dietas
//  Botón/Opción para crear una nueva receta


// dispara action POST_RECIPE

export default function CreateForm() {
	return (
		<div>
			<div>Home component</div>
			<NavLink to='/home'>Home</NavLink>
			<form>
				<input type='text' />
			</form>
		</div>
	)
};