import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseAuth/supabaseClient';

const FoodAPIInfoAdd = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { id, label, kcal, fat, protein, carbs, serving } = location.state;
  console.log(id, label, kcal, fat, protein, carbs, serving)

  const [nutritionValues, setNutritionValues] = useState({
   foodLabel: label,
   foodServing: serving ? serving.quantity : 100,
   foodKcal: kcal,
   foodProtein: protein,
   foodFat: fat,
   foodCarbs: carbs,
  })

  const handleServingChange = (e) => {
    const newServing = e.target.value;
    console.log(newServing)
    setNutritionValues({
      ...nutritionValues,
     foodServing: newServing,
    });
    console.log(nutritionValues)
  };

  useEffect(() => {
    const { foodServing } = nutritionValues;
    const newKcal = kcal * (foodServing / 100);
    const newProtein = protein * (foodServing / 100);
    const newFat = fat * (foodServing / 100);
    const newCarbs = carbs * (foodServing / 100);

    setNutritionValues({
      ...nutritionValues,
      foodServing: foodServing,
      foodKcal: newKcal,
      foodProtein: newProtein,
      foodFat: newFat,
      foodCarbs: newCarbs,
    });
  }, [nutritionValues.foodServing]);

  const handleAddFood = async (e) => {
    e.preventDefault()
    const { foodLabel, foodServing, foodKcal, foodProtein, foodFat, foodCarbs } = nutritionValues
    console.log(foodLabel, foodServing, foodKcal, foodProtein, foodFat, foodCarbs)
    console.log(typeof foodKcal)
    try {
      const { data, error } = await supabase
      .from('food')
      .insert([
        {food_name: foodLabel, 
        calories: foodKcal,
        fat: foodFat,
        protein: foodProtein,
        carbs: foodCarbs,
        serving_amt: foodServing
        }
      ])
      if (error) {
        console.log(error)
      }
      const { data: data2, error: error2 } = await supabase
      .from('diary')
      .insert([
        {food_name: foodLabel, 
        calories: foodKcal,
        fat: foodFat,
        protein: foodProtein,
        carbs: foodCarbs,
        serving_amt: foodServing
        }
      ])
      if (error2) {
        console.log(error2)
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

  const { foodServing, foodKcal, foodProtein, foodFat, foodCarbs } = nutritionValues;

  return (
    <>
      <button onClick={() => navigate(-1)}> Back </button>
      <form id={id} onClick={handleAddFood}>
        <h4>{label}</h4>
        <input type="number" name="serving" value={foodServing} onChange={handleServingChange}/>
        <label htmlFor="serving">g</label>
        <p>Calories: {foodKcal.toFixed(1)} kcal</p>
        <p>P: {foodProtein.toFixed(1)}g</p>
        <p>F: {foodFat.toFixed(1)}g</p>
        <p>C: {foodCarbs.toFixed(1)}g</p>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default FoodAPIInfoAdd