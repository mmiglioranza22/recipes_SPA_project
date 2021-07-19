import React, { useEffect, useState } from 'react';
import { getDiets, postRecipe } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MIN_LENGTH } from '../../constants';
import { Redirect } from 'react-router-dom';
import s from './CreateForm.module.css';


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
	const [done, setDone] = useState(false);
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		name: "",
		summary: "",
		score: 0,
		healthScore: 0,
		instructions: "",
		dietTypes: []
	});

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

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
			setDone(true);
			alert('Your recipe has been created!');
		} else {
			alert('Please check if all mandatory fields are correct or have been completed');
		};
	};
	return (
		<div>{done ? <Redirect to='/home/myrecipes' />
			:
			<div className={s.container}>
				<div className={s.title}>
					<div>Tell us about your recipe!</div>
					<div>(Fields with * are mandatory)</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.labels}><label>*Recipe's Name:</label>
					<input className={errors.name && s.danger}
						type='text' name='name' autoComplete='off' placeholder='Type here...' value={input.name} onChange={handleInputChange} />

					{errors.name ? <div className={s.danger_notice}>{errors.name}</div> : null}
					<div className={s.labels}><label>*Brief summary:</label></div>
					<textarea className={errors.summary && s.danger}
						type='text' name='summary' placeholder='Type here...' value={input.summary} onChange={handleInputChange} />
					{errors.summary ? <div className={s.danger_notice}>{errors.summary}</div> : null}
						</div>
					<label htmlFor='score'>Score:</label>
					<input className={s.scores} type='number' max='100' min='0' name='score' value={input.score} onChange={handleInputChange} />

					<label htmlFor='healthScore'>Health score:</label>
					<input className={s.scores} type='number' max='100' min='0' name='healthScore' value={input.healthScore} onChange={handleInputChange} />

					<div>
						<label htmlFor='instructions'>Step-by-step instructions:</label>
						<textarea type='text' name='instructions' placeholder='Type here...' value={input.instructions} onChange={handleInputChange} />
					</div>

					<div>Which type of diet suits your recipe?:</div>
					{dietsDB.map((diet) => <div key={diet} className={s.dietTypes}><div>{diet}</div><input type='checkbox' name='dietTypes' value={diet} onChange={handleInputChange} /></div>)}

					<input className={s.submit} type='submit' value='Submit!' />
				</form>
			</div>
		}
		</div>
	)
};
