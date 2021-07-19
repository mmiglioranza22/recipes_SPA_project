import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';

//--not required--

// Link a /home/delete
// Link a /home/edit
export default function NavBar() {

	return (
		<div className={s.nav}>
			<div className={s.link}>
				<NavLink to='/home' className={s.text}>Home</NavLink>
			</div>
			<div className={s.link}>
				<NavLink to='/home/myrecipes' className={s.text}>My recipes</NavLink>
			</div>
			<div className={s.link}>
				<NavLink to='/home/create' className={s.text}>Create your own recipe!</NavLink>
			</div>
		</div>
	)
};