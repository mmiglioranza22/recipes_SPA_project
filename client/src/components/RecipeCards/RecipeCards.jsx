import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeDetail } from '../../actions/actions';
import { IMG_URL } from '../../constants';
import s from './RecipeCards.module.css';

export default function RecipeCards({ recipeInfo }) {
	const dispatch = useDispatch();
	let { id, image, title, diets, dairyFree, glutenFree, vegan, vegetarian, score } = recipeInfo;

	const handleClick = () => {
		dispatch(getRecipeDetail(id));
	};

	return (
		<div className={s.recipe_container}>
			<img src={image ? image : IMG_URL} alt='' />

			<div>Recipe name: <span className={s.name}>'{title}'</span></div>
			<div>
				<span>Diet types: </span>
				{diets.length ? diets.map(diet => <div className={s.dietType}key={diet}><span>{diet}</span></div>) : <span>Not specified</span>}
				<div className={s.emoji}>
					<div className={s.spangrid}>
				{diets.includes('vegetarian') || vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
				{diets.includes('vegan') || vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
				{diets.includes('gluten free') || glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
				{diets.includes('ovo vegetarian') || diets.includes('paleo') || diets.includes('vegan') || dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
					</div>
				</div>
			</div>
			<div>Score: <span>{score}</span> /
			{score > 85 ? <span> (Pretty good!)</span> : score > 65 ? <span> (Not bad!)</span>: score > 45 ? <span> (Average)</span> : score > 35 ? <span> (Could be better)</span> : <span> (Eat at own risk!)</span>}
			</div> 
			<button onClick={handleClick}>
				<Link to={`/home/detail/${id}`}>Show details</Link>
			</button>
		</div>
	)
};