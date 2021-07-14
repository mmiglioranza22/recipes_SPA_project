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
	// const [recipe, setRecipe] = useState(recipeDetail);
	
	// useEffect(()=> {
	// 	setRecipe(recipeDetail)
	// });
	let { id, image, title, dietTypes, vegetarian, vegan, glutenFree, dairyFree, dishTypes, summary, spoonacularScore, healthScore, instructions } = recipeDetail;

	let div = document.createElement("div");
	div.innerHTML = summary;
	let text = div.textContent || div.innerText || "";

	return (
		<div>
			{  !recipeDetail ? <div>Loading</div> : 
		<div className='detail'>
			<div>
				<img src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZCeiUKL-X5mZpwbvUwIGl7IL_wPG5Sb0dV20VSAvS3L3apNITgQqK4NYJ68gZFnAG_Y&usqp=CAU'} />
				<div>Recipe name: '{title}'</div>
				<div>
					<div>Diet types:</div>
					{Array.isArray(dietTypes) ? dietTypes.map(diet => <div key={diet}><div>{diet}</div></div>) : <div>Not specified</div>}
					{Array.isArray(dietTypes) && vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span>}
					{Array.isArray(dietTypes) && vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span>}
					{Array.isArray(dietTypes) && glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span>}
					{Array.isArray(dietTypes) && dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span>}
				</div>
				<div>Summary:</div>
				{typeof summary === 'string' ? text : <div>No summary was provided for this recipe</div>}
				<div>Instructions:</div>
				{typeof instructions === 'string' ? <div>{instructions}</div> : <div>No particular instructions. Proceed as you please.</div>}
			</div>
			<div>Score:</div>
			{spoonacularScore ? <span>{spoonacularScore}</span> : <span>Not scored (Hmm...suspicious...)</span>}
			<div>Heath score:</div>
			{healthScore ? <span>{healthScore}</span> : <span>Not scored (Or not healthy at all!)</span>}
			<div>Dish type:</div>
			<div>This recipe can be prepared for: </div>
			{Array.isArray(dishTypes) ? dishTypes.map(type => <div>{type}</div>) : <div> all dishes!</div>}
		</div>
		}
		</div>	
	)
};