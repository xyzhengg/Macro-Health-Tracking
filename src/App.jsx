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


function App() {
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    getWeight();
  }, []);

  async function getWeight() {
    const { data } = await supabase.from("weight").select();
    setWeight(data);
    console.log(data)
  }

  return (
    <> 
      <SignUp/>
      <br/>
      <Login/>
      <br/>
      <Logout/>
      <br/>
      <FoodSearcher/>
      <ul>
        {weight.map((eachWeight) => (
          <li key={eachWeight.id}>{eachWeight.kg}kg</li>
        ))}
      </ul>
    
      <Routes>
        <Route path="/" element={<RecipeAPISearcherPage/>} />
        <Route path="/apirecipe/:id" element={<RecipeAPIInfo/>} />
      </Routes>
    </>

  );
}

export default App;