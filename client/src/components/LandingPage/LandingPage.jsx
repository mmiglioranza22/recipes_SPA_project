import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css'

function LandingPage() {
  return (
    <div className={s.container}>
      <div className={s.main}>
      <h1>Welcome to the recipes's app landing page!</h1>
        <Link exact to='/home' className={s.enter}>Enter</Link>      
      </div>
    </div>
  );
}

export default LandingPage;