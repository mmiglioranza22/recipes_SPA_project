import { GET_RECIPES, GET_DETAIL, POST_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from "../constants";

const initialState = {
	recipesLoaded: [],
	recipesCreated: [], //--not required-- //Ya se guardan en la base de datos. Si hago post y get, me va a salir en recipesLoaded las recetas creadas (si las busco por nombre)
	recipeDetail: {}
};

export default function rootReducer(state = initialState, action) {
	switch(action.type){
		case GET_RECIPES:
			return {...state, recipesLoaded: action.payload};
		case POST_RECIPE: 
			return {...state, recipesCreated: [...state.recipesCreated, action.payload]};
		case GET_DETAIL:
			return {...state, recipeDetail: action.payload};
		case 'RESET':
			return {...state, recipeDetail: {}}
		
		// -- a chequear ultimos dos casos, cuando este el PI ya terminado, NO ANTES!!!
		case UPDATE_RECIPE:
			//return {...state, recipesLoaded: state.recipesLoaded.forEach( r => { if(r.id === action.payload.id) r = action.payload })} // tengo que hacer un GET_ALL para que funcione
			return {...state, recipesCreated: state.recipesCreated.forEach( r => { if(r.id === action.payload.id) r = action.payload })}; // funciona sin hacer un GET_ALL, pero se borra si doy F5
			//tendria que retornar ambos // return {...state, recipesCreated:modifico con forEach..., recipesLoaded:...modifico con forEach}
		case DELETE_RECIPE:
			return {...state, recipesCreated: state.recipesCreated.filter( r => r.id !== action.payload.id)};
			// lo mismo, borrar de recipesCreated y recipesLoaded, total el dispatch la borra de la DB
		default:
			return state
	}
}