import './App.css'
import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom";
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
import { Box, Grid} from '@mui/material'
import { MealProvider } from './contexts/MealContext';
import DayDisplay from './pages/DayDisplay';
import { useAuth } from './contexts/AuthProvider'
import { DateProvider} from './contexts/DateProvider.jsx'
import ProfilePage from './pages/ProfilePage';
import ProfileEditForm from './components/ProfileEditForm';


function App() {
  const navigate = useNavigate();
  const { user, session } = useAuth()

  useEffect(() => {
    if (!user && !session) {
      navigate('/login')
    }
  }, [user, session])
  
  return (
    <DateProvider>
      <Grid container>
        { user && (<Grid item xs={2}>
          <PermanentDrawerLeft/>
        </Grid>)} 
        <Grid item xs={user? 10 : 12}>
          <MealProvider>
          <Routes>
            {user && 
              <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/edit" element={<ProfileEditForm/>}/>
                <Route path="/apirecipesearch" element={<RecipeAPISearcherPage />} />
                <Route path="/apirecipe/:id" element={<RecipeAPIInfo />} />
                <Route path="/apifood/:id" element={<FoodAPIInfoAdd />} />
                <Route path="/apifoodsearch" element={<FoodSearcher />} />
                <Route path="/createfood" element={<CreateFoodForm />} />
                <Route path="/food-recipe-searcher" element={<FoodAndRecipeSearcherPage />} />
                <Route path="/signup" element={<Navigate to="/" />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/" element={<DayDisplay />} />
              </>
              }

              {!user && (
                  <>
                    <Route path="/" element={<Navigate to="/login"/>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Navigate to="/login"/>} />
                  </>
                )
              }
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </MealProvider>
        </Grid>
      </Grid>
    </DateProvider>
  );
}

export default App;


// https://ui.dev/react-router-programmatically-navigate