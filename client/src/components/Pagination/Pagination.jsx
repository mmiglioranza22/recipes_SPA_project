import React from 'react';
import { Link } from 'react-router-dom';
import s from './Pagination.module.css';

export default function Pagination({ recipesPerPage, totalRecipes, paginate, currentPage }) {
	const pageNumbers = [];
	
	for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {  // 10 / 9 = 1.1111 => 2 pages va a renderizar
		pageNumbers.push(i);
	};

	return (
		<div className={s.container}>

					{pageNumbers.length && currentPage > 1 ? <Link className={s.buttons} onClick={() => paginate(currentPage -1)} to='/home'>Previous</Link> : null }
					<span className={s.page}>
						{pageNumbers.map(number => {
							return (
								<span key={number}>
									<Link className={s.number}onClick={() => paginate(number)} to='/home'>{number}</Link>
								</span>
							)
						})}
					</span>
					{pageNumbers.length  && currentPage <= pageNumbers.length-1? <Link className={s.buttons} onClick={() => paginate(currentPage + 1)} to='/home' >Next</Link> : null }
		</div>
	)
}