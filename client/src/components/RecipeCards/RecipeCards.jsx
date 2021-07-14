import React from 'react';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import { Link } from 'react-router-dom';
// consumir state store (recipesLoaded) y mapear el array, ver que componentes segun README


export default function RecipeCards ({recipeInfo}) {

// ver como le paso la id de este componente a RecipeDetail (desde este match.params.id directo? o tiene que viajar por props? o lo saco de la store? --->DISPATCH(GETRECIPEID(ID))!!
// store: RecipeDetail consume la store con useSelector, hace un recipesLoaded.filter(r=> r.id === match.params.id? algo asi))
// O TENGO QUE MANDAR EL ID DESDE APP POR Route render={...}, ver HW movies / weather

let {id, image, title, diets, dairyFree, glutenFree, vegan, vegetarian, dishTypes} = recipeInfo; // dishTypes no se necesita aca, ver bien README, se sacaria de aca y de controller getAll para API
	
	return (

		<div className='cards'>
			<img src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZCeiUKL-X5mZpwbvUwIGl7IL_wPG5Sb0dV20VSAvS3L3apNITgQqK4NYJ68gZFnAG_Y&usqp=CAU'} />
			<div>Recipe name: '{title}'</div>
			<div>
				<div>Diet types:</div>
				{diets.length ? diets.map(diet => <div key={diet}><div>{diet}</div></div>) : <div>None specific</div>}
				{diets.includes('Vegetarian') || vegetarian ? <span>Vegetarian ✅</span> : <span>Vegetarian ❌</span> }
				{diets.includes('Vegan') || vegan ? <span>Vegan ✅</span> : <span>Vegan ❌</span> }
				{diets.includes('Gluten Free') || glutenFree ? <span>Gluten Free ✅</span> : <span>Gluten Free ❌</span> }
				{diets.includes('Ovo-Vegetarian') || diets.includes('Paleo') || diets.includes('Vegan') || dairyFree ? <span>Dairy Free ✅</span> : <span>Dairy Free ❌</span> }
			</div>
			<Link to={`/Invocar a la funcion onClick que despacha la action con el id!!`}>More info</Link> 
		</div>
	)
};