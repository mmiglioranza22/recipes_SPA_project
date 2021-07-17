import React from 'react';
import { Route } from 'react-router';


import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import CreateForm from './components/CreateForm/CreateForm';
import CreatedRecipes from './components/CreatedRecipes/CreatedRecipes';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/home' component={SearchBar} />
      <Route exact path='/home/detail/:id' component={RecipeDetail} /> 
      <Route exact path='/home/create' component={CreateForm} />
      <Route exact path='/home/myrecipes' component={CreatedRecipes} />
      <Route path='/home' component={NavBar} />
    </div>
  );
}

export default App;
