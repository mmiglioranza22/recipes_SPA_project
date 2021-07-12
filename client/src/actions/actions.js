import axios from "axios";
import { GET_RECIPES, GET_DETAIL, POST_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, BASE_URL } from "../constants";

export function getRecipes(name) {
	return function (dispatch) {
		return axios.get(`${BASE_URL}/recipes?name=${name}`)
			.then(json => {
				dispatch({ type: GET_RECIPES, payload: json.data }); // que me devuelve si es error? o busqueda dio 0? ver back
			}); //.catch(err => dispatch()) // sin nada, entonces devuelve el estado tal cual, no hace nada?, o dispatch(type: ERROR, payload: err)?
	};
};

export function getRecipeDetail(id) {
	return function (dispatch) {
		return axios.get(`${BASE_URL}/recipes/${id}`)
			.then(json => {
				dispatch({ type: GET_DETAIL, payload: json.data }); // que me devuelve si es error? o busqueda dio 0? ver back
			}); //.catch??
	};
};

export function postRecipe(recipe) {
	return function (dispatch) {
		return axios.post(`${BASE_URL}/recipe`, recipe)
			.then(json => {
				dispatch({type: POST_RECIPE, payload: json.data}) // la respuesta que me da el back, una vez que se creo la receta 
			});	
	};
};


//--not required --


export function updateRecipe(id) {
	return function (dispatch){
		return axios.put(`${BASE_URL}/recipes/${id}`)
			.then( json => {
				dispatch({type: UPDATE_RECIPE, payload: json.data}) // payload, el id // el json.data es un array con 0 o 1 si fue modificado o no, tendria que cambiar el metodo en el controller
			});
	};
};


export function deleteRecipe(id) {
	return function (dispatch){
		return axios.delete(`${BASE_URL}/recipes/${id}`)
			.then( json => {
				dispatch({type: DELETE_RECIPE, payload: json.data}) // payload, el id // el json.data es 200 con un texto si fue eliminada, tendria que cambiar el metodo en el controller
			})
	}
}

