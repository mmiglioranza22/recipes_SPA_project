import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';


import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the recipes's app landing page!</h1>
      <Route exact to='/asda' component={Home} />
      
      
    </div>
  );
}

export default App;
