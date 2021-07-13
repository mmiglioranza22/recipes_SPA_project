import React, { useState } from 'react';
import { postRecipe } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { MIN_LENGTH } from '../../constants';


// Ruta de creación de recetas: debe contener

//  Un formulario controlado con los siguientes campos // OK
// Nombre		// OK
// Resumen del plato // OK
// Puntuación	// OK
// Nivel de "comida saludable"		// OK
// Paso a paso		// OK
//  Posibilidad de seleccionar/agregar uno o más tipos de dietas	// OK
//  Botón/Opción para crear una nueva receta // OK

export function validate(input) {
	let errors = {};
	if (!input.name) {
		errors.name = 'Please enter a name for your recipe.';
	} else if (!/^[\w\-\s]+$/.test(input.name)) {
		errors.name = 'Only alphanumeric characters are allowed.';
	}
	if (!input.summary) {
		errors.summary = 'Please tell us about your recipe';
	} else if (input.summary.length < MIN_LENGTH) {
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
				if (e.target.checked) {
					return ({ ...prev, dietTypes: [...prev.dietTypes, parseInt(e.target.value)] });
				} else {
					return ({ ...prev, dietTypes: prev.dietTypes.filter(d => d !== parseInt(e.target.value)) })
				};
			} else {
				return ({ ...prev, [e.target.name]: e.target.value })
			};
		});

		if (e.target.name === 'name' || e.target.name === 'summary') {
			let objError = validate({ ...input, [e.target.name]: e.target.value })
			setErrors(objError);
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (errors.name === undefined && errors.summary === undefined && input.name.length > 0 && input.summary.length >= MIN_LENGTH) {
			dispatch(postRecipe(input)) /
				alert('Your recipe has been created!')
		} else {
			alert('Please check if all mandatory fields are correct or have been completed')
		}
	}

	let diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];

	return (
		<div>
			<div>Tell us about your recipe!</div>
			<div>(Fields with * are mandatory)</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name' >Recipe's Name:</label>
				<span>*</span><input className={errors.name && 'danger'}
					type='text' name='name' value={input.name} onChange={handleInputChange} />
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
				<label>Which type of diet it belongs to?:</label>
				{diets.map((diet, i) => <div key={`${diet}`}><span>{diet}</span><input type='checkbox' name='dietTypes' value={i + 1} onChange={handleInputChange} /></div>)}
				<br />
				<input type='submit' value='Submit!' />
			</form>
		</div>
	)
};
