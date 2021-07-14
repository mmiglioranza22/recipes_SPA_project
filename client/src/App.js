import React from 'react';
import { Route } from 'react-router';


import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import RecipeCards from './components/RecipeCards/RecipeCards';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import CreateForm from './components/CreateForm/CreateForm';


// ver colision entre detail y form
function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/home' component={NavBar} />
      <Route path='/home' component={SearchBar} />
      <Route exact path='/home/detail/:id' component={RecipeDetail} /> 
      <Route exact path='/home/create' component={CreateForm} />
    </div>
  );
}

export default App;
