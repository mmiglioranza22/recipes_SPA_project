import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ recipesPerPage, totalRecipes, paginate, currentPage }) {
	const pageNumbers = [];
	
	for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
		pageNumbers.push(i);
	};

	return (
		<div>

					{pageNumbers.length && currentPage > 1 ? <Link onClick={() => paginate(currentPage -1)} to='/home'>Previous</Link> : null }
					<ul>
						{pageNumbers.map(number => {
							return (
								<li key={number}>
									<Link onClick={() => paginate(number)} to='/home'>{number}</Link>
								</li>
							)
						})}
					</ul>
					{pageNumbers.length  && currentPage <= pageNumbers.length-1? <Link onClick={() => paginate(currentPage + 1)} to='/home' >Next</Link> : null }
		</div>
	)
}