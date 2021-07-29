import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearError, getRecipes } from '../../actions/actions';
import s from './SearchBar.module.css';


export default function SearchBar () {
	const dispatch = useDispatch();
	const [input, setInput] = useState({ name: '' });

	const handleChange = (e) => {
		setInput( prev => {
			return {...prev, name: e.target.value}
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(clearError())
	  dispatch(getRecipes(input.name));
	};

	return (
		<div className={s.searchbar}>
		<form onSubmit={handleSubmit}>
			<input type="text" id='name' autoComplete='off' placeholder='Search recipes here!' value={input.value} onChange={handleChange} className={s.input} />
			<input type="submit" value='Find' className={s.submit} />
		</form>
		</div>
	)
};