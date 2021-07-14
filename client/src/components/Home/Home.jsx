import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCards from '../RecipeCards/RecipeCards';

//  Input de búsqueda para encontrar recetas por nombre
//  Área donde se verá el listado de recetas. Deberá mostrar su:
// 			Imagen
// 			Nombre
// 			Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
//  Botones/Opciones para filtrar por por tipo de dieta
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
//  Paginado para ir buscando y mostrando las siguientes recetas

// ACA se mapea, este es el CARDS, recipeCard es el CARD. VER hw weather
// cuando search se ejecute, home consume la store y renderiza RecipeCards
//entonces, es aca donde se hacen o se importan los componentes filtros (Home es cointainer, creo)
// los componentes filtros: consumen la store (recipesLoaded) y devuelven un nuevo array que debe renderizarse (renderiza recipeCards)
// el filtro seria un <select> con <options>, que al ser elegidos ejecutan una funcion concreta:
//	- (de a-z, de z-a -> tipo toggle)
// 	- por recipeLoaded[i].score(mayor a menor) --> se genera un nuevo array, creo. El de la store no se muta!
//  (otros si quiero:)




export default function Home() {
	const recipesLoaded = useSelector(state => state.recipesLoaded)

	return (
		<div className='home'>
			<div>Home component, you are now in /home</div>
      {recipesLoaded.length ? recipesLoaded.map(recipe => <div key={recipe.id}><RecipeCards recipeInfo={recipe} /></div>) : <div>No results</div> }
		</div>
	)
};