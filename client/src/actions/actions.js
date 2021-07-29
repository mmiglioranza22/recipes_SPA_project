import axios from "axios";
import { CLEAR_ERROR, ERROR, TOGGLE_LOADING, GET_RECIPES, GET_DETAIL, POST_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, BASE_URL, GET_DIETS } from "../constants";


export function toggleLoading(){
	return { type: TOGGLE_LOADING };
};

export function clearError() {
	return {type: CLEAR_ERROR}
}

export function getDiets() {
	return function(dispatch) {
		return axios.get(`${BASE_URL}/types`)
			.then(json => {
				dispatch({type: GET_DIETS, payload: json.data})
			})
	};
};

export function getRecipes(name) {
	return function (dispatch) {
		dispatch(toggleLoading());
		if(!name) {
			return axios.get(`${BASE_URL}/recipes`) // randomly searches for recipes when starts
			.then(json => {
				dispatch({ type: GET_RECIPES, payload: json.data });
			})
			.catch(err => {
				dispatch({type: ERROR})
			});

		}
		return axios.get(`${BASE_URL}/recipes?name=${name}`)
			.then(json => {
				dispatch({ type: GET_RECIPES, payload: json.data });
			})
			.catch(err => {
				dispatch({type: ERROR})
			}); 
	};
};

export function getRecipeDetail(id) {
	return function (dispatch) {
		dispatch(toggleLoading());
		return axios.get(`${BASE_URL}/recipes/${id}`)
			.then(json => {
				dispatch({ type: GET_DETAIL, payload: json.data });
			})
			.catch(err => {
				dispatch({type: ERROR})
			});
	};
};

export function postRecipe(recipe) {
	return function (dispatch) {
		return axios.post(`${BASE_URL}/recipe`, recipe)
			.then(json => {
				dispatch({type: POST_RECIPE, payload: json.data})
			});	
	};
};



//--not required --


export function updateRecipe(id) {
	return function (dispatch){
		return axios.put(`${BASE_URL}/recipes/${id}`)
			.then( json => {
				dispatch({type: UPDATE_RECIPE, payload: json.data}) 
			});															
	};
};


export function deleteRecipe(id) {
	return function (dispatch){
		return axios.delete(`${BASE_URL}/recipes/${id}`)
			.then( json => {
				dispatch({type: DELETE_RECIPE, payload: json.data}) 
			})															
	}
}

