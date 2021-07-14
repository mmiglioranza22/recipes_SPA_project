import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getRecipes } from '../../actions/actions';
import RecipeCards from '../RecipeCards/RecipeCards'

export default function SearchBar () {

const dispatch = useDispatch();
const [input, setInput] = useState({ name: '' });
const recipesLoaded = useSelector(state => state.recipesLoaded)
//dispara la action GET_ALL

// state interno para almacenar el name de la recipe
// acceso a la store para despachar los getAll

// en el useEffect setear para que ni bien se monte, dispare el dispatch con getRecipes('pasta')?? ver
const handleChange = (e) => {
	setInput( prev => {
		return {...prev, name: e.target.value}
	})
}


const handleSubmit = (e) => {
	e.preventDefault();
  dispatch(getRecipes(input.name))
	//console.log(recipesLoaded) // ojo, a veces trae 100, a veces 36?? ver
}
// responseBack.data que trae si tiene cosas(mapear), y si no tiene cosas (ver un atributo si es typeof string, y mostrar eso)

	return (
		<div className='search'>
		<label>What recipes are you looking for?</label>
		<form onSubmit={handleSubmit}>
		<input type="text" id='name' autoComplete='off' placeholder='Type here...' value={input.value} onChange={handleChange} />
		<input type="submit" value='Search' />
		</form>
		{recipesLoaded.length ? recipesLoaded.map(recipe => <div key={recipe.id}><RecipeCards recipeInfo={recipe} /></div>) : <div>No results</div> }
		</div>
	)
};