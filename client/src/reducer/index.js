import { ERROR, GET_DIETS, TOGGLE_LOADING, GET_RECIPES, GET_DETAIL, POST_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, CLEAR_ERROR } from "../constants";

const initialState = {
	recipesLoaded: [],
	recipesCreated: [],
	recipeDetail: {},
	dietsDB: [],
	loading: false,
	error: ''
	
};

export default function rootReducer(state = initialState, action) {
	switch(action.type){
		case GET_RECIPES:
			return {...state, recipesLoaded: action.payload, loading: false};
		case POST_RECIPE: 
			return {...state, recipesCreated: [...state.recipesCreated, action.payload]};
		case GET_DETAIL:
			return {...state, recipeDetail: action.payload, loading: false};
		case GET_DIETS: 
			return {...state, dietsDB: action.payload}
		case TOGGLE_LOADING:
			return {...state, loading: true};
		case ERROR:
			return {...state, error: 'We are sorry, no recipes where found'}
		case CLEAR_ERROR:
			return {...state, error: ''};
			
		// -- a chequear ultimos dos casos, cuando este el PI ya terminado, NO ANTES!!!
		case UPDATE_RECIPE:
			//return {...state, recipesLoaded: state.recipesLoaded.forEach( r => { if(r.id === action.payload.id) r = action.payload })} // tengo que hacer un GET_ALL para que funcione
			return {...state, recipesCreated: state.recipesCreated.forEach( r => { if(r.id === action.payload.id) r = action.payload })}; // funciona sin hacer un GET_ALL, pero se borra si doy F5
			//tendria que retornar ambos // return {...state, recipesCreated:modifico con forEach..., recipesLoaded:...modifico con forEach} 
			// NO, porque recipesLoaded se actualiza de la db, y la action ya impacto en la db, entonces un get_recipes trae la recipe ya actualizada
		case DELETE_RECIPE:
			return {...state, recipesCreated: state.recipesCreated.filter( r => r.id !== action.payload.id)};
			// lo mismo, borrar de recipesCreated y recipesLoaded, total el dispatch la borra de la DB
			// NO, por lo mismo de arriba. solo en recipesCreated esta bien
		default:
			return state
	};
};