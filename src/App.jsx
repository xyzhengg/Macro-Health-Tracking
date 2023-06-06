import './App.css'
import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from './supabaseAuth/supabaseClient';
import SignUp from './components/SignUp';
import Login  from './components/Login';
import FoodSearcher from './components/FoodAPISearcher';
import RecipeAPISearcherPage from './pages/RecipeAPISearcherPage';
import RecipeAPIInfo from './components/RecipeAPIInfo';
import FoodAPIInfoAdd from './components/FoodAPIInfoAdd';
import CreateFoodForm from './components/CreateFoodForm';
import NotFound from './pages/NotFound';
import PermanentDrawerLeft from './components/PermanentDrawerLeft';
import FoodAndRecipeSearcherPage from './components/FoodAndRecipeSearcherPage';
import Box from '@mui/material/Box'
import { MealProvider } from './components/MacroTrackingDisplay';
import DayDisplay from './pages/DayDisplay';
import { useAuth } from './contexts/AuthProvider';

function App() {
  const navigate = useNavigate();
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      { user && (<Box>
        <PermanentDrawerLeft/>
      </Box>)} 
      <MealProvider>
        <Routes>
          <Route path="/" element={<DayDisplay/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/apirecipesearch" element={<RecipeAPISearcherPage/>} />
          <Route path="/apirecipe/:id" element={<RecipeAPIInfo/>} />
          <Route path="/apifood/:id" element={<FoodAPIInfoAdd/>}/>
          <Route path="/apifoodsearch" element={<FoodSearcher/>}/>
          <Route path="/createfood" element={<CreateFoodForm/>} />
          <Route path="/food-recipe-searcher" element={<FoodAndRecipeSearcherPage/>} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </MealProvider>
    </>
  );
}

export default App;
