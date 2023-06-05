import './App.css'
import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { supabase } from './supabaseAuth/supabaseClient';
import SignUp from './components/SignUp';
import Login  from './components/Login';
import Logout from './components/Logout';
import FoodSearcher from './components/FoodAPISearcher';
import RecipeAPISearcherPage from './pages/RecipeAPISearcherPage';
import RecipeAPIInfo from './components/RecipeAPIInfo';
import FoodAPIInfoAdd from './components/FoodAPIInfoAdd';
import CreateFoodForm from './components/CreateFoodForm';
import NotFound from './pages/NotFound';
import Homepage from './pages/Homepage';


function App() {

  return (
    <> 
      <SignUp/>
      <br/>
      <Login/>
      <br/>
      <Logout/>
      <br/>
      <Link to="/apifoodsearch"> Food Search </Link>
      <br/>
      <Link to="/apirecipesearch"> Recipe Search </Link>
      <br/>
      <Link to="/createfood"> Create Food </Link>
    
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/apirecipesearch" element={<RecipeAPISearcherPage/>} />
        <Route path="/apirecipe/:id" element={<RecipeAPIInfo/>} />
        <Route path="/apifood/:id" element={<FoodAPIInfoAdd/>}/>
        <Route path="/apifoodsearch" element={<FoodSearcher/>}/>
        <Route path="/createfood" element={<CreateFoodForm/>} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>

  );
}

export default App;