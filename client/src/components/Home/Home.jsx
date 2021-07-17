import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCards from '../RecipeCards/RecipeCards';
import { lastScore, orderAZ, orderZA, topScore } from '../../orderFunctions';
import Pagination from '../Pagination/Pagination';
import { getDiets } from '../../actions/actions';
//  Input de búsqueda para encontrar recetas por nombre //
//  Área donde se verá el listado de recetas. // OK
// 	Deberá mostrar su: 
// 			Imagen	//OK
// 			Nombre	//OK
// 			Tipo de dieta (vegetariano, vegano, apto celíaco, etc) //OK
//  Botones/Opciones para filtrar por por tipo de dieta // OK
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación // OK
//  Paginado para ir buscando y mostrando las siguientes recetas // OK

// ver los errores aca, como renderizar

export default function Home() {
	let recipesLoaded = useSelector(state => state.recipesLoaded)
	let [recipesFiltered, setRecipesFiltered] = useState([]);
	const loading = useSelector(state => state.loading);
	const [currentPage, setCurrentPage] = useState(1);
	const [recipesPerPage] = useState(9)
	const [order, setOrder] = useState({ type: '' });
	const [filtered, setFiltered] = useState(false);
	const [filter, setFilter] = useState('');
	const dispatch = useDispatch();
	const dietsDB = useSelector(state => state.dietsDB);

	useEffect(() => {
		dispatch(getDiets());
		setFiltered(false)
	}, [dispatch]);


	//Get current recipes
	const indexLastRecipe = currentPage * recipesPerPage; // 1*9 = 9
	const indexFirstRecipe = indexLastRecipe - recipesPerPage; // 9-9=0
	const currentRecipes = recipesLoaded.slice(indexFirstRecipe, indexLastRecipe);
	const currentRecipesFiltered = recipesFiltered.slice(indexFirstRecipe, indexLastRecipe);

	//Changes page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleChange = (e) => {
		setOrder(prev => ({ ...prev, type: e.target.value }));
	};

	const handleApply = (e) => {
		// console.log(recipesLoaded)
		// console.log('entro')
		// console.log(e.target.value)
		if (e.target.value === 'reset') {
			setFiltered(false)
			return
		};
		if (recipesLoaded) {
			setRecipesFiltered(prev => prev = recipesLoaded.filter(r => r.diets.find(d => d === e.target.value)))
			setFilter(e.target.value);
			setFiltered(true);
		}
	}
	// console.log(recipesFiltered)


	const handleSubmit = (e) => {
		e.preventDefault();
		if (order.type === 'AZ') {
			setOrder(prev => ({ ...prev, type: e.target.value }));
			return orderAZ(recipesLoaded)
		};
		if (order.type === 'ZA') {
			setOrder(prev => ({ ...prev, type: e.target.value }));
			return orderZA(recipesLoaded)
		};
		if (order.type === 'scorefirst') {
			setOrder(prev => ({ ...prev, type: e.target.value }));
			return topScore(recipesLoaded);
		};
		if (order.type === 'scorelast') {
			setOrder(prev => ({ ...prev, type: e.target.value }));
			return lastScore(recipesLoaded);
		};
	};

	if (!filtered) {
		// console.log('!filtered')
		return (
			<div className='home'>
				<div>Home component, you are now in /home</div>
				<Pagination recipesPerPage={recipesPerPage} totalRecipes={recipesLoaded.length} paginate={paginate} currentPage={currentPage} />
				<form onSubmit={handleSubmit}>
					<label htmlFor='orderby'>Order by:</label>
					<select value={order.type} name='orderby' onChange={handleChange}>
						<option value="" disabled defaultValue=''>Select your option</option>
						<option value='AZ'>A-Z</option>
						<option value='ZA'>Z-A</option>
						<option value='scorefirst'>Top Score</option>
						<option value='scorelast'>Last Score</option>
					</select>
					<input type='submit' value='Order' />
				</form>
				<div>
					<label htmlFor='filter'>Diet type:</label>
				</div>
				<span>Reset</span><input type='radio' name='dietTypes' value='reset' onClick={handleApply} />
				{dietsDB.map((diet) => <div key={diet}><span>{diet}</span><input type='radio' name='dietTypes' value={diet.toLowerCase()} onClick={handleApply} /></div>)}
				{loading ?
					<div> 
					<div>Results (if any) should appear below:</div>
					<div>No results</div>
				</div>
					: (recipesLoaded.length) ?
						currentRecipes.map(recipe => <div key={recipe.id}><RecipeCards recipeInfo={recipe} /></div>)
						: null
				}
			</div>
		)
	};


	if (filtered) {
		// console.log('filtered')
		const handleSubmit = (e) => {
			e.preventDefault();
			if (order.type === 'AZ') {
				setOrder(prev => ({ ...prev, type: e.target.value }));
				return orderAZ(recipesFiltered)
			};
			if (order.type === 'ZA') {
				setOrder(prev => ({ ...prev, type: e.target.value }));
				return orderZA(recipesFiltered)
			};
			if (order.type === 'scorefirst') {
				setOrder(prev => ({ ...prev, type: e.target.value }));
				return topScore(recipesFiltered);
			};
			if (order.type === 'scorelast') {
				setOrder(prev => ({ ...prev, type: e.target.value }));
				return lastScore(recipesFiltered);
			};
		};
		return (
			<div className='home'>
				<div>Home component, you are now in /home</div>
				<Pagination recipesPerPage={recipesPerPage} totalRecipes={recipesFiltered.length} paginate={paginate} currentPage={currentPage} />
				<form onSubmit={handleSubmit}>
					<label htmlFor='orderby'>Order by:</label>
					<select value={order.type} name='orderby' onChange={handleChange}>
						<option value="" disabled defaultValue=''>Select your option</option>
						<option value='AZ'>A-Z</option>
						<option value='ZA'>Z-A</option>
						<option value='scorefirst'>Top Score</option>
						<option value='scorelast'>Last Score</option>
					</select>
					<input type='submit' value='Order' />
				</form>
				<div>
					<label htmlFor='filter'>Diet type:</label>
				</div>
				<span>Reset</span><input type='radio' name='dietTypes' value='reset' onClick={handleApply} />
				{recipesFiltered.length ? <div>All '{filter}' recipes are displayed above</div> : <div>No recipes founded for '{filter}' diet</div>}
				{loading ?
				<div> 
					<div>Results (if any) should appear below:</div>
					<div>No results</div>
				</div>	
					: (recipesFiltered.length) ?
						currentRecipesFiltered.map(recipe => <div key={recipe.id}><RecipeCards recipeInfo={recipe} /></div>)
						: null
				}
			</div>
		)
	}
};