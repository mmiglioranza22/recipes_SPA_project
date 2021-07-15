import React, { useEffect, useState } from 'react';
import { getDiets, postRecipe } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MIN_LENGTH } from '../../constants';
//import { Redirect } from 'react-router';


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
	};
	if (!input.summary) {
		errors.summary = 'Please tell us about your recipe';
	} else if (input.summary.length < MIN_LENGTH) {
		errors.summary = 'Enter at least 20 characters';
	};
	return errors;
};

export default function CreateForm() {
	const dispatch = useDispatch();
	const dietsDB = useSelector(state => state.dietsDB);

	useEffect(() => {
		dispatch(getDiets());
	}, []); 

	const [errors, setErrors] = useState({});
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
					return ({ ...prev, dietTypes: [...prev.dietTypes, e.target.value] });
				} else {
					return ({ ...prev, dietTypes: prev.dietTypes.filter(d => d !== e.target.value) })
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
			dispatch(postRecipe(input));
			alert('Your recipe has been created!');
		} else {
			alert('Please check if all mandatory fields are correct or have been completed');
		};
	};

	return (
		<div>
			<div>Tell us about your recipe!</div>
			<div>(Fields with * are mandatory)</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name' >Recipe's Name:</label>
				<span>*</span><input className={errors.name && 'danger'}
					type='text' name='name' autoComplete='off' placeholder='Type here...' value={input.name} onChange={handleInputChange} />
				<br />
				<p className="danger">{errors.name}</p>
				<label htmlFor='summary'>Brief summary:</label>
				<span>*</span><textarea className={errors.summary && 'danger'}
					type='text' name='summary' placeholder='Type here...' value={input.summary} onChange={handleInputChange} />
				<br />
				<p className="danger">{errors.summary}</p>
				<label htmlFor='score'>Score:</label>
				<input type='number' max='100' min='0' name='score' value={input.score} onChange={handleInputChange} />
				<br />
				<label htmlFor='healthScore'>Health score:</label>
				<input type='number' max='100' min='0' name='healthScore' value={input.healthScore} onChange={handleInputChange} />
				<br />
				<label htmlFor='instructions'>Step-by-step instructions:</label>
				<textarea type='text' name='instructions' placeholder='Type here...' value={input.instructions} onChange={handleInputChange} />
				<br />
				<label>Which type of diet it belongs to?:</label>
				{dietsDB.map((diet) => <div key={diet}><span>{diet}</span><input type='checkbox' name='dietTypes' value={diet} onChange={handleInputChange} /></div>)}
				<br />
				<input type='submit' value='Submit!' />
			</form>
		</div>
	)
};
