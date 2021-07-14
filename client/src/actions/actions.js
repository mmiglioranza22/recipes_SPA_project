import axios from "axios";
import { GET_RECIPES, GET_DETAIL, POST_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, BASE_URL } from "../constants";

export function getRecipes(name) {
	return function (dispatch) {
		return axios.get(`${BASE_URL}/recipes?name=${name}`)
			.then(json => {
				dispatch({ type: GET_RECIPES, payload: json.data }); // no catcheo nada, los errores ya los maneje en el back, aca recibe o bien .data o error(ir al error endware y manejarlo ahi)
			}); 
	};
};

export function getRecipeDetail(id) {
	return function (dispatch) {
		return axios.get(`${BASE_URL}/recipes/${id}`)
			.then(json => {
				dispatch({ type: GET_DETAIL, payload: json.data }); // no catcheo nada, los errores ya los maneje en el back, aca recibe o bien .data o error(ir al error endware y manejarlo ahi)
			});
	};
};

export function postRecipe(recipe) {
	return function (dispatch) {
		return axios.post(`${BASE_URL}/recipe`, recipe)
			.then(json => {
				dispatch({type: POST_RECIPE, payload: json.data}) // la respuesta que me da el back, una vez que se creo la receta (los dietTypes aparecen en json.data.diets[i].name) 
			});	
	};
};


export function resetDetail() {
	return {type: 'RESET'}
}

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

