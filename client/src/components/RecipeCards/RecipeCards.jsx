import React from 'react';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import { Link } from 'react-router-dom';
// consumir state store (recipesLoaded) y mapear el array, ver que componentes segun README


export default function RecipeCards ({recipeInfo}) {

// ver como le paso la id de este componente a RecipeDetail (desde este match.params.id directo? o tiene que viajar por props? o lo saco de la store?
// store: RecipeDetail consume la store con useSelector, hace un recipesLoaded.filter(r=> r.id === match.params.id? algo asi))
// O TENGO QUE MANDAR EL ID DESDE APP POR Route render={...}, ver HW movies / weather
	if (recipeInfo.diets)	
	
	return (

		<div className='cards'>
			<img src={recipeInfo.image ? recipeInfo.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZCeiUKL-X5mZpwbvUwIGl7IL_wPG5Sb0dV20VSAvS3L3apNITgQqK4NYJ68gZFnAG_Y&usqp=CAU'} />

			<div>Recipe name: '{recipeInfo.title}'</div>
			
			<div>
				<div>Diet types:</div>
				{recipeInfo.diets.length ? recipeInfo.diets.map(diet => <div>{diet}</div>) : <div>None specific</div>}
				{recipeInfo.diets.includes('Vegetarian') || recipeInfo.vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span> }
				{recipeInfo.diets.includes('Vegan') || recipeInfo.vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span> }
				{recipeInfo.diets.includes('Gluten Free') || recipeInfo.glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span> }
				{recipeInfo.diets.includes('Ovo-Vegetarian') || recipeInfo.dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span> }
			</div>
			
			<Link to={`/home/detail/${recipeInfo.id}`}>More info</Link> 
			

		</div>
	)
};