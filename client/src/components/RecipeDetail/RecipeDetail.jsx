import React from 'react';
import { useSelector } from "react-redux";
import { IMG_URL } from '../../constants';
import s from './RecipeDetail.module.css';

export default function RecipeDetail() {
	const recipeDetail = useSelector(state => state.recipeDetail);
	const loading = useSelector(state => state.loading);
	let { id, image, title, dietTypes, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } = recipeDetail;

	// Cleans summary & instructions html tags from API
	let divSummary = document.createElement("div");
	divSummary.innerHTML = summary;
	let text1 = divSummary.textContent || divSummary.innerText || "";
	let divInstructions = document.createElement("div");
	divInstructions.innerHTML = instructions;
	let text2 = divInstructions.textContent || divInstructions.innerText || "";

	return (
		<div>
			{loading ? <div className={s.loading}>Please wait, the page is loading</div> :
				<div className={s.container}>
					<div>
						<div className={s.title}>'{title}'</div>
						<img className={s.image} src={image ? image : IMG_URL} alt='' />
						<div className={s.diets}>
							<div><strong>Diet types: </strong></div>
							{dietTypes.length ? dietTypes.map(diet => <div key={diet} className={s.diet}><div>{diet}</div></div>) : <div>Not specified</div>}
						</div>
							<div>
								<div className={s.diet}> 
							{dietTypes.includes('Vegetarian') || vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
							{dietTypes.includes('Vegan') || vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
							{dietTypes.includes('Gluten Free') || glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
							{dietTypes.includes('Ovo-Vegetarian') || dietTypes.includes('Paleo') || dietTypes.includes('Vegan') || dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
								</div>
							</div>
						<div className={s.summary}>
							<div>Summary:</div>
							<br />
							{typeof summary === 'string' ? text1 : <div>No summary was provided for this recipe</div>}
						</div>
						<br />
						<div className={s.instructions}>
							<div>Instructions:</div>
							<br />
							{typeof instructions === 'string' ? text2 : <div>No particular instructions. Proceed as you please.</div>}
						</div>
					</div>
					<div className={s.score}>
						<span>Score: </span>
						{spoonacularScore ? <span><strong>{spoonacularScore}</strong></span> : <span>Not scored (Hmm...suspicious...)</span>}
						<br />
						<span>Heath score: </span>
						{healthScore ? <span><strong>{healthScore}</strong></span> : <span>Not scored (Or not healthy at all!)</span>}
						</div>
						<div><strong>Dish types:</strong> <i>This recipe can be prepared for:</i></div>
						<div>
						{dishTypes ? dishTypes.map(type => <div key={type} className={s.dishes}><div>"{type}"</div></div>) : <div> all dishes and meals!</div>}
						</div>
						<div> Id number: {id}</div>
					</div>
		}
				</div>	
	)
};