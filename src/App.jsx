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
import { GoalProvider } from './contexts/GoalProvider';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import InitialProfileSetup from './components/InitialProfileSetup';
import LoginSignUp from './pages/LoginSignUp';


function App() {
  const navigate = useNavigate();
  const { user, session } = useAuth()

  useEffect(() => {
    if (!user && !session) {
      navigate('/')
    }
  }, [user, session])
  
  return (
    <DateProvider>
      <GoalProvider>
        <Grid container>
          { user && (<Grid item xs={2}>
            <PermanentDrawerLeft/>
          </Grid>)} 
          <Grid item xs={user? 10 : 12}>
            <MealProvider>
            <Routes>
              {user && session &&
                <>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/profile/setup" element={<InitialProfileSetup/>}/>
                  <Route path="/api/recipes/search" element={<RecipeAPISearcherPage />} />
                  <Route path="/api/recipe/:id" element={<RecipeAPIInfo />} />
                  <Route path="/api/food/:id" element={<FoodAPIInfoAdd />} />
                  <Route path="/api/food/search" element={<FoodSearcher />} />
                  <Route path="/createfood" element={<CreateFoodForm />} />
                  <Route path="/search" element={<FoodAndRecipeSearcherPage />} />
                  <Route path="/signup" element={<Navigate to="/" />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/" element={<DayDisplay />} />
                </>
                }

                {!user && (
                    <>
                      <Route path="/" element={<LoginSignUp/>} />
                      <Route path="/*" element={<LoginSignUp/>} />
                    </>
                  )
                }
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </MealProvider>
          </Grid>
        </Grid>
      </GoalProvider>
    </DateProvider>
  );
}

export default App;


// https://ui.dev/react-router-programmatically-navigate