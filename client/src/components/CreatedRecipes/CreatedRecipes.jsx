import React from 'react';
import { useSelector } from "react-redux";
import { IMG_URL } from '../../constants';

export default function CreatedRecipes() {
	const recipesCreated = useSelector(state => state.recipesCreated);

	return (
		<div>
			{!recipesCreated.length ? <div>Oops! The are no recipes yet, go make some!</div> :
				<div>
					{recipesCreated.map(r => {
						return (<div key={r.name}>
							<div>
								<img src={IMG_URL} alt='' />
								<div>Recipe name: '{r.name}'</div>
								<div>
									<div>Diet types:</div>
									{r.dietTypes.length ? r.dietTypes.map(diet => <div key={diet}><div>{diet}</div></div>) : <div>Not specified</div>}
									{r.dietTypes.includes('vegetarian') ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
									{r.dietTypes.includes('vegan') ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
									{r.dietTypes.includes('gluten free') ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
									{r.dietTypes.includes('ovo vegetarian') || r.dietTypes.includes('paleo') || r.dietTypes.includes('vegan') ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
								</div>
								<div>Summary:</div>
								{typeof r.summary === 'string' ? r.summary : <div>No summary was provided for this recipe</div>}
								<div>Instructions:</div>
								{typeof r.instructions === 'string' ? r.instructions : <div>No particular instructions. Proceed as you please.</div>}
							</div>
							<div>Score:</div>
							{r.score ? <span>{r.score}</span> : <span>Not scored (Hmm...suspicious...)</span>}
							<div>Heath score:</div>
							{r.healthScore ? <span>{r.healthScore}</span> : <span>Not scored (Or not healthy at all!)</span>}
							<div>Dish type:</div>
							<div>This recipe can be prepared for all dishes and meals!</div>
							<br/>

						</div>)
					})}
				</div>


			}



		</div>











	)
};