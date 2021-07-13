import React from 'react';

export default function SearchBar () {


//dispara la action GET_ALL
// function para controlar el formulario

// state interno para almacenar el name de la recipe
// acceso a la store para despachar los getAll

	return (
		<div className='search'>
		<div>SearchBar component</div>
		<label>What recipes are you looking for?</label>
		<input type="text" />
		</div>
	)
};