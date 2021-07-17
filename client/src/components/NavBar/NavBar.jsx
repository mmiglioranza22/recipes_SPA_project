import React from 'react';
import { NavLink } from 'react-router-dom';

//--not required--

// Link a /home/delete
// Link a /home/edit
export default function NavBar() {

	return (
		<div className='nav'>
			<div>NavBar component</div>
			<NavLink to='/home/create'>Create your own recipe!</NavLink>
			<NavLink to='/home'>Home</NavLink>
			<NavLink to='/home/myrecipes'>My recipes</NavLink>
		</div>
	)
};