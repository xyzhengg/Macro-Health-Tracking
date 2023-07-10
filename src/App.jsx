import './App.css'
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FoodSearcher from './components/FoodAPISearcherPage';
import RecipeAPISearcherPage from './pages/RecipeAPISearcherPage';
import RecipeAPIInfo from './components/RecipeAPIInfo';
import CreateFoodForm from './components/CreateFoodForm';
import CreateRecipeForm from'./components/CreateRecipeForm';
import NotFound from './pages/NotFound';
import PermanentDrawerLeft from './components/PermanentDrawerLeft';
import FoodAndRecipeSearcherPage from './components/FoodAndRecipeSearcherPage';
import { Grid} from '@mui/material'
import { MealProvider } from './contexts/MealContext';
import DayDisplay from './pages/DayDisplay';
import { useAuth } from './contexts/AuthProvider'
import { DateProvider} from './contexts/DateProvider.jsx'
import { GoalProvider } from './contexts/GoalProvider';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import InitialProfileSetup from './components/InitialProfileSetup';
import LoginSignUp from './pages/LoginSignUp';
import Statistics from './pages/Statistics';


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
          { user && session && (<Grid item xs={2}>
            <PermanentDrawerLeft/>
          </Grid>)} 
          <Grid item xs={user? 10 : 12}>
            <MealProvider>
            <Routes>
              {user && session ? (
                <>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/profile/setup" element={<InitialProfileSetup/>}/>
                  <Route path="/api/recipes/search" element={<RecipeAPISearcherPage />} />
                  <Route path="/api/recipe/:id" element={<RecipeAPIInfo />} />
                  <Route path="/api/food/search" element={<FoodSearcher />} />
                  <Route path="/create/food" element={<CreateFoodForm />} />
                  <Route path="/create/recipe" element={<CreateRecipeForm />} />                 
                  <Route path="/search" element={<FoodAndRecipeSearcherPage />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/" element={<DayDisplay />} />
                </>
                ) : (
                <>
                  <Route path="/" element={<LoginSignUp/>} />
                  <Route path="/*" element={<LoginSignUp/>} />
                </>
                )}
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