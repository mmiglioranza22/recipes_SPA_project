import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { postRecipe } from '../../actions/actions';
import { useDispatch } from 'react-redux';

// Ruta de creación de recetas: debe contener

//  Un formulario controlado con los siguientes campos
// Nombre
// Resumen del plato
// Puntuación
// Nivel de "comida saludable"
// Paso a paso
//  Posibilidad de seleccionar/agregar uno o más tipos de dietas
//  Botón/Opción para crear una nueva receta


// dispara action POST_RECIPE

//tiene un state interno, el cual se actualiza y manda la despacha la action?

export function validate(input) {
	let errors = {};
	if (!input.name) {
		errors.name = 'Please enter a name for your recipe.';
	} else if (!/^[\w\-\s]+$/.test(input.rname)) {
		errors.name = 'Only alphanumeric characters are allowed.';
	}
	if (!input.summary) {
		errors.summary = 'Please tell us about your recipe';
	} else if (input.summary.length <= 19) {
		errors.summary = 'Enter at least 20 characters';
	}
	return errors;
};


export default function CreateForm() {

	const dispatch = useDispatch();
	const [errors, setErrors] = React.useState({});

	const [input, setInput] = useState({
		name: "",
		summary: "",
		score: 0,
		healthScore: 0,
		instructions: "",
		dietTypes: []
	});

	const handleInputChange = (e) => {
		setInput(prev => {
			if (e.target.name === 'dietTypes') {
				if (!input.dietTypes.includes(e.target.value)) {
					return ({ ...prev, dietTypes: input.dietTypes.push(e.target.value) }); // si quiere string, parseInt(e.target.value)
				} else {
					return ({ ...prev, dietTypes: input.dietTypes.filter(d => d !== e.target.value) });
				}
			} else {
				return ({ ...prev, [e.target.name]: e.target.value }) 
			}																								
		});
		
		if (e.target.name === 'name' || e.target.name === 'summary') { // no entra si no son campos que tiene que verificar
			let objError = validate({ ...input, [e.target.name]: e.target.value })
			setErrors(objError);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (errors.name === undefined && errors.summary === undefined) {
			dispatch(postRecipe(input)) // ver esto bien, useDispatch para dispatch e importar actions
			alert('Your recipe has been created!')
		} else {
			alert('Please check if all mandatory fields are correct or have been completed')
		}
	}



	let diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];

	//function para ir pusheando en un array todos los dietTypes, y finalmente setearlo al input.dietTypes

	// map para los checkboxes, hacer array con nombres, value= index+1

	return (
		<div>
			<div>Tell us about your recipe!</div>
			<div>(Fields with * are mandatory)</div>
			<NavLink to='/home'>Home</NavLink>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name' >Recipe's Name:</label>
				<span>*</span><input className={errors.name && 'danger'}
					type='text' name='name' value={input.name} onChange={handleInputChange} /> {/*value vincula lo que escribo con el input y lo agrega al estado user */}
				<br />
				<p className="danger">{errors.name}</p>

				<label htmlFor='summary'>Brief summary:</label>
				<span>*</span><textarea className={errors.summary && 'danger'}
					type='text' name='summary' value={input.summary} onChange={handleInputChange} /> 
				<br />
				<p className="danger">{errors.summary}</p>

				<label htmlFor='score'>Score:</label>
				<input type='number' max='100' min='0' name='score' value={input.score} onChange={handleInputChange} />
				<br />
				<label htmlFor='healthScore'>HealthScore:</label>
				<input type='number' max='100' min='0' name='healthScore' value={input.healthScore} onChange={handleInputChange} />
				<br />
				<label htmlFor='instructions'>Step-by-step instructions:</label>
				<textarea type='text' name='instructions' value={input.instructions} onChange={handleInputChange} />
				<br />
				<label htmlFor='dietTypes'>Which type of diet it belongs to?:</label>
				{diets.map((diet, i) => <div key={`diet`}><span>{diet}</span><input type='checkbox' name='dietTypes' value={i + 1} onChange={handleInputChange} /></div>)}

				<br />

				<input type='button' value='Submit' />

			</form>
		</div>
	)
};




	//let diets = ['gluten', 'keto', 'vege', 'lacto', 'ovo', 'vegan', 'pesce', 'paleo', 'primal', 'whole']
	// <span></span><input type='checkbox' name='dietTypes-gluten' value={1} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-keto' value={2} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-vege' value={3} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-lacto' value={4} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-ovo' value={5} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-vegan' value={6} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-pesce' value={7} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-paleo' value={8} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-primal' value={9} onChange={handleInputChange} />
	// 			<span></span><input type='checkbox' name='dietTypes-whole' value={10} onChange={handleInputChange} />