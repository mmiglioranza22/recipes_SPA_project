import React from 'react';
import { NavLink } from 'react-router-dom';


// Link a /home
// Link a /home/create


//--not required--

// Link a /home/delete
// Link a /home/edit
export default function NavBar() {
	return (
		<div>
			<div>NavBar component</div>
			<NavLink to='/home/create'>Create your own recipe!</NavLink>
		</div>
	)
};