import React from 'react';
import { NavLink } from 'react-router-dom';



function LandingPage() {
  return (
    <div className='landing'>
      <h1>Welcome to the recipes's app landing page!</h1>
      <NavLink exact to='/home'>Enter</NavLink>      
    </div>
  );
}

export default LandingPage;