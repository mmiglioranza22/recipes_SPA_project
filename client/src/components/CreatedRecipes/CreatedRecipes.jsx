import React from 'react';
import { useSelector } from "react-redux";
import { IMG_URL } from '../../constants';
import s from './CreatedRecipes.module.css';

export default function CreatedRecipes() {
	const recipesCreated = useSelector(state => state.recipesCreated);

	return (
		<div className={s.container}>
			{!recipesCreated.length ? <div className={s.loading}>Oops! The are no recipes yet, go make some!</div> :
				<div>
					{recipesCreated.map(r => {
						return (<div key={r.name} className={s.recipe}>
							<div>
								<img className={s.img} src={IMG_URL} alt='' />
								<div>Recipe name: <span className={s.name}>'{r.name}'</span></div>
								<div>
									<span>Diet types:</span>
											{r.dietTypes.length ? r.dietTypes.map(diet => <div className={s.dietType} key={diet}><span>{diet}</span></div>) : <div>Not specified</div>}
									
									<div className={s.emoji}>
										<div className={s.spangrid}>
											{r.dietTypes.includes('vegetarian') ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
											{r.dietTypes.includes('vegan') ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
											{r.dietTypes.includes('gluten free') ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
											{r.dietTypes.includes('ovo vegetarian') || r.dietTypes.includes('paleo') || r.dietTypes.includes('vegan') ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
										</div>
										</div>
										
										</div>
										<div className={s.text}>
										<div className={s.titles}>Summary:</div>
										{typeof r.summary === 'string' ? r.summary : <div>No summary was provided for this recipe</div>}
										<div className={s.titles}>Instructions:</div>
										{typeof r.instructions === 'string' ? r.instructions : <div>No particular instructions. Proceed as you please.</div>}
									</div>
									</div>
									<div className={s.titles}>Score:</div>
									{r.score ? <span>{r.score}</span> : <span>Not scored (Hmm...suspicious...)</span>}
									<div className={s.titles}>Heath score:</div>
									{r.healthScore ? <span>{r.healthScore}</span> : <span>Not scored (Or not healthy at all!)</span>}
									<div className={s.titles}>Dish type:</div>
									<div>This recipe can be prepared for all dishes and meals!</div>
									<br />
								</div>
								)
					})}
							</div>
			}
						</div>

						)
					};