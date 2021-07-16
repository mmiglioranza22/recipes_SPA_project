import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCards from '../RecipeCards/RecipeCards';
import { toggleLoading } from '../../actions/actions';
import { lastScore, orderAZ, orderZA, topScore } from '../../orderFunctions';
// import { orderAz, orderZa, orderTopScore, orderLastScore } from '../../orderFunctions';

//  Input de búsqueda para encontrar recetas por nombre
//  Área donde se verá el listado de recetas. Deberá mostrar su:
// 			Imagen
// 			Nombre
// 			Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
//  Botones/Opciones para filtrar por por tipo de dieta
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
//  Paginado para ir buscando y mostrando las siguientes recetas


//entonces, es aca donde se hacen o se importan los componentes filtros (Home es cointainer, creo)
// los componentes filtros: consumen la store (recipesLoaded) y devuelven un nuevo array que debe renderizarse (renderiza recipeCards)
// el filtro seria un <select> con <options>, que al ser elegidos ejecutan una funcion concreta:
//	- (de a-z, de z-a -> tipo toggle)
// 	- por recipeLoaded[i].score(mayor a menor) --> se genera un nuevo array, creo. El de la store no se muta!
//  (otros si quiero:)

// ver los errores aca, como renderizar

export default function Home() {
	let recipesLoaded = useSelector(state => state.recipesLoaded)
	const dispatch = useDispatch();
	const loading = useSelector(state => state.loading);
	const [order, setOrder] = useState({
		type: '',
	});

	const handleChange = (e) => {
		setOrder(prev => ({...prev, type: e.target.value}));
	//	dispatch(toggleLoading())
	};

	const handleSubmit = (e) => {
		//llama al sort indicado
		e.preventDefault();
			if (order.type === 'AZ') {
				setOrder(prev => ({...prev, type: e.target.value }));
				return orderAZ(recipesLoaded)
			};
			if (order.type === 'ZA') {
				setOrder(prev => ({...prev, type: e.target.value}));
				return orderZA(recipesLoaded)
			};
			if (order.type === 'scorefirst') {
				setOrder(prev => ({...prev, type: e.target.value}));
				return topScore(recipesLoaded);
			};
			if (order.type === 'scorelast') {
				setOrder(prev => ({...prev, type: e.target.value}));
				return lastScore(recipesLoaded);
			};

	};


	return (
		<div className='home'>
			<div>Home component, you are now in /home</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='orderby'>Order by:</label>
				<select value={order.type} name='orderby' onChange={handleChange}>
					<option value='AZ'>A-Z</option>
					<option value='ZA'>Z-A</option>
					<option value='scorefirst'>Top Score</option>
					<option value='scorelast'>Last Score</option>
				</select>
				<input type='submit' value='Order' />

			</form>
			{loading ? 
				<div>Results (if any) should appear below</div> 
				: recipesLoaded.length ? 
				recipesLoaded.map(recipe => <div key={recipe.id}><RecipeCards recipeInfo={recipe} /></div>) 
				: <div>No results</div>}
		</div>
	)
};