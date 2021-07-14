import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetDetail } from '../../actions/actions';

// Link a /home
// Link a /home/create


//--not required--

// Link a /home/delete
// Link a /home/edit
export default function NavBar() {
	// const dispatch = useDispatch();
	// const handleClick = (e) => {
	// 	dispatch(resetDetail());
	// };

	return (
		<div className='nav'>
			<div>NavBar component</div>
			<NavLink to='/home/create'>Create your own recipe!</NavLink>
			<NavLink to='/'>Take me back</NavLink>
		</div>
	)
};