import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../actions/actions';

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
	  dispatch(getRecipes(input.name));
	};

	return (
		<div className='search'>
		<label>What recipes are you looking for?</label>
		<form onSubmit={handleSubmit}>
			<input type="text" id='name' autoComplete='off' placeholder='Type here...' value={input.value} onChange={handleChange} />
			<input type="submit" value='Search' />
		</form>
		</div>
	)
};