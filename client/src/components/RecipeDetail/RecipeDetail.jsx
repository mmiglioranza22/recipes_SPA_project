import React from 'react';
import { useSelector } from "react-redux";

// Ruta de detalle de receta: debe contener

//  Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
//  Resumen del plato
//  Puntuación
//  Nivel de "comida saludable"
//  Paso a paso

export default function RecipeDetail() {

	const recipeDetail = useSelector(state => state.recipeDetail);
	const loading = useSelector(state => state.loading);
	let { id, image, title, dietTypes, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } = recipeDetail;

	let divSummary = document.createElement("div");
	divSummary.innerHTML = summary;
	let text1 = divSummary.textContent || divSummary.innerText || "";
	let divInstructions = document.createElement("div");
	divInstructions.innerHTML = instructions;
	let text2 = divInstructions.textContent || divInstructions.innerText || "";
	
	return (
		<div>
			{  loading ? <div>Please wait, the page is loading</div> : 
		<div className='detail'>
			<div>
				<img src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZCeiUKL-X5mZpwbvUwIGl7IL_wPG5Sb0dV20VSAvS3L3apNITgQqK4NYJ68gZFnAG_Y&usqp=CAU'} alt=''/>
				<div>Recipe name: '{title}'</div>
				<div>
					<div>Diet types:</div>
					{dietTypes.length ? dietTypes.map(diet => <div key={diet}><div>{diet}</div></div>) : <div>Not specified</div>}
					{dietTypes.includes('Vegetarian') || vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
					{dietTypes.includes('Vegan') || vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
					{dietTypes.includes('Gluten Free') || glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
					{dietTypes.includes('Ovo-Vegetarian') || dietTypes.includes('Paleo') || dietTypes.includes('Vegan') || dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
				</div>
				<div>Summary:</div>
				{typeof summary === 'string' ? text1 : <div>No summary was provided for this recipe</div>}
				<div>Instructions:</div>
				{typeof instructions === 'string' ? text2 : <div>No particular instructions. Proceed as you please.</div>}
			</div>
			<div>Score:</div>
			{spoonacularScore ? <span>{spoonacularScore}</span> : <span>Not scored (Hmm...suspicious...)</span>}
			<div>Heath score:</div>
			{healthScore ? <span>{healthScore}</span> : <span>Not scored (Or not healthy at all!)</span>}
			<div>Dish type:</div>
			<div>This recipe can be prepared for: </div>
			{dishTypes ? dishTypes.map(type => <div key={type}><div>{type}</div></div>) : <div> all dishes and meals!</div>}
			<div> Id number: {id}</div>
		</div>
		}
		</div>	
	)
};