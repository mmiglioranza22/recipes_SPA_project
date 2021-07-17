import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeDetail } from '../../actions/actions';

export default function RecipeCards({ recipeInfo }) {
	const dispatch = useDispatch();
	let { id, image, title, diets, dairyFree, glutenFree, vegan, vegetarian, score } = recipeInfo;

	const handleClick = () => {
		dispatch(getRecipeDetail(id));
	};

	return (
		<div className='cards'>
			<img src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZCeiUKL-X5mZpwbvUwIGl7IL_wPG5Sb0dV20VSAvS3L3apNITgQqK4NYJ68gZFnAG_Y&usqp=CAU'} alt='' />
			<div>Recipe name: '{title}'</div>
			<div>
				<div>Diet types:</div>
				{diets.length ? diets.map(diet => <div key={diet}><div>{diet}</div></div>) : <div>Not specified</div>}
				{diets.includes('vegetarian') || vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
				{diets.includes('vegan') || vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
				{diets.includes('gluten free') || glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
				{diets.includes('ovo vegetarian') || diets.includes('paleo') || diets.includes('vegan') || dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
			</div>
			<div>Score: {score}</div>
			<button onClick={handleClick}>
				<Link to={`/home/detail/${id}`}>Show details</Link>
			</button>
		</div>
	)
};