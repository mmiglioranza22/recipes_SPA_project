import React from 'react';
import { Route } from "react-router-dom";

//import { NavLink } from 'react-router-dom';
import CreateForm from '../CreateForm/CreateForm';
import NavBar from '../NavBar/NavBar';
import RecipeCards from '../RecipeCards/RecipeCards';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import SearchBar from '../SearchBar/SearchBar';




//  Input de búsqueda para encontrar recetas por nombre
//  Área donde se verá el listado de recetas. Deberá mostrar su:
// 			Imagen
// 			Nombre
// 			Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
//  Botones/Opciones para filtrar por por tipo de dieta
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
//  Paginado para ir buscando y mostrando las siguientes recetas


export default function Home() {
	return (
		<React.Fragment>
			<div>Home component</div>
      <Route exact to='/home' component={NavBar} />
      <Route exact to='/home' component={SearchBar} />
      <Route exact to='/home' component={RecipeCards} />
      <Route exact to='/home/:name' component={RecipeDetail} />
      <Route exact to='/home/create' component={CreateForm} />
		</React.Fragment>
	)
};