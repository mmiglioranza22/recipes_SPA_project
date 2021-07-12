import { GET_RECIPES, GET_DETAIL, POST_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from "../constants";

// cada action tiene su archivo independiente, se importan todas desde index.js en actions
// todos mis archivos index en cada carpeta van a ser un receptaculo donde todo es importado y exportado desde index 
// crear el initialState (tiene un arreglo vacio en ppio), crear mi reducer (no olvidar retornar siempre {...state, etc} y el default en el reducer retorna state)
// no olvidar el connect si uso mapState y mapDispatch (y que ambos devuelven objetos)

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
			return {...state, recipeDetail: action.payload}
		
		// -- a chequear ultimos dos casos, cuando este el PI ya terminado, NO ANTES!!!
		case UPDATE_RECIPE:
			//return {...state, recipesLoaded: state.recipesLoaded.forEach( r => { if(r.id === action.payload.id) r = action.payload })} // tengo que hacer un GET_ALL para que funcione
			return {...state, recipesCreated: state.recipesCreated.forEach( r => { if(r.id === action.payload.id) r = action.payload })}; // funciona sin hacer un GET_ALL, pero se borra si doy F5
		case DELETE_RECIPE:
			return {...state, recipesCreated: state.recipesCreated.filter( r => r.id !== action.payload.id)}
		default:
			return state
	}
}