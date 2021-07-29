import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCards from '../RecipeCards/RecipeCards';
import { lastScore, orderAZ, orderZA, topScore } from '../../orderFunctions';
import Pagination from '../Pagination/Pagination';
import { getDiets, getRecipes } from '../../actions/actions';
import s from './Home.module.css'
//  Input de búsqueda para encontrar recetas por nombre //
//  Área donde se verá el listado de recetas. // OK
// 	Deberá mostrar su: 
// 			Imagen	//OK
// 			Nombre	//OK
// 			Tipo de dieta (vegetariano, vegano, apto celíaco, etc) //OK
//  Botones/Opciones para filtrar por por tipo de dieta // OK
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación // OK
//  Paginado para ir buscando y mostrando las siguientes recetas // OK

export default function Home() {
	let recipesLoaded = useSelector(state => state.recipesLoaded)
	let [recipesFiltered, setRecipesFiltered] = useState([]);
	const loading = useSelector(state => state.loading);
	const [currentPage, setCurrentPage] = useState(1);
	const [recipesPerPage] = useState(10)
	const [order, setOrder] = useState({ type: '' });
	const [filtered, setFiltered] = useState(false);
	const [filter, setFilter] = useState('');
	const dispatch = useDispatch();
	const dietsDB = useSelector(state => state.dietsDB);
	const error = useSelector(state => state.error)

	useEffect(() => {
		dispatch(getDiets());
		dispatch(getRecipes())
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
		if (e.target.value === 'reset') {
			setFiltered(false)
			return
		};
		if (recipesLoaded) {
			setRecipesFiltered(prev => prev = recipesLoaded.filter(r => r.diets.find(d => d === e.target.value)))
			setFilter(e.target.value);
			setFiltered(true);
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (order.type === 'AZ') {
			setOrder(prev => ({ ...prev, type: e.target.value }));
			return orderAZ(recipesLoaded);
		};
		if (order.type === 'ZA') {
			setOrder(prev => ({ ...prev, type: e.target.value }));
			return orderZA(recipesLoaded);
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
		return (
			<div>
				{currentRecipes.length ?
					<Pagination className={s.pagination} recipesPerPage={recipesPerPage} totalRecipes={recipesLoaded.length} paginate={paginate} currentPage={currentPage} />
					: <div className={s.message}>No recipes for display right now. Go search some!</div>
				}
				<div className={s.home}>
					<div className={s.order}>
						<div>Order by:</div>
						<form onSubmit={handleSubmit}>
							<select className={s.select} value={order.type} name='orderby' onChange={handleChange}>
								<option value="" disabled defaultValue=''>Select your option</option>
								<option value='AZ'>A-Z</option>
								<option value='ZA'>Z-A</option>
								<option value='scorefirst'>Top Score</option>
								<option value='scorelast'>Last Score</option>
							</select>
							<input className={s.submit} type='submit' value='Order' />
						</form>
					</div>
					<div className={s.filter}>
						<div>Diet type:</div>
						{dietsDB.map((diet) => <div key={diet} className={s.diets}><span>{diet}</span><input type='radio' name='dietTypes' value={diet.toLowerCase()} onClick={handleApply} /></div>)}
						<div className={s.diets}>
							<span>Reset</span><input type='radio' name='dietTypes' value='reset' onClick={handleApply} />
						</div>
					</div>
					<div className={s.recipes}>
						{loading ?
							<div className={s.loading}>
								<div>Results (if any) should appear below:</div>
								{error ? <div>{error}</div> : <div>Please wait</div>}
							</div>
							: (recipesLoaded.length) ?
								currentRecipes.map(recipe => <div key={recipe.id}><RecipeCards className={s.recipe} recipeInfo={recipe} /></div>)
								: null
						}
					</div>
				</div>
			</div>
		);
	};


	if (filtered) {
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
			<div>
				{recipesFiltered.length ?
					<Pagination className={s.pagination} recipesPerPage={recipesPerPage} totalRecipes={recipesFiltered.length} paginate={paginate} currentPage={currentPage} />
					: null
				}
				<div className={s.home}>
					<div className={s.order}>
						<div>Order by:</div>
						<form onSubmit={handleSubmit}>
							<select className={s.select} value={order.type} name='orderby' onChange={handleChange}>
								<option value="" disabled defaultValue=''>Select your option</option>
								<option value='AZ'>A-Z</option>
								<option value='ZA'>Z-A</option>
								<option value='scorefirst'>Top Score</option>
								<option value='scorelast'>Last Score</option>
							</select>
							<input className={s.submit} type='submit' value='Order' />
						</form>
					</div>
					<div className={s.filter}>
						<div>Diet type:</div>
						<div className={s.diets}>
						{recipesFiltered.length ? <div>All '{filter}' recipes are displayed above /</div> : <div>No recipes founded for '{filter}' diet /</div>}
							<span>Reset</span><input type='radio' name='dietTypes' value='reset' onClick={handleApply} />
						</div>
					</div>
					<div className={s.recipes}>
						{loading ?
							<div className={s.loading}>
								<div>Results (if any) should appear below:</div>
								{error ? <div>{error}</div> : <div>Please wait</div>}
							</div >
							: (recipesFiltered.length) ?
								currentRecipesFiltered.map(recipe => <div key={recipe.id}><RecipeCards recipeInfo={recipe} /></div>)
								: <div className={s.message_filtered}>Sorry! It seems there are no recipes for such diet...</div>
						}
					</div>
				</div>
			</div>
		);
	};
};