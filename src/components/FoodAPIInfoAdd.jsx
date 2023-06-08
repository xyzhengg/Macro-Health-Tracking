import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseAuth/supabaseClient';
import { Box, Typography, TextField, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMeal } from '../contexts/MealContext';
import { useAuth } from '../contexts/AuthProvider';
import { useDate } from '../contexts/DateProvider';

const FoodAPIInfoAdd = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id, label, kcal, fat, protein, carbs, serving } = location.state;
  const { meal } = useMeal()
  const { user } = useAuth()
  const { date, setDate } = useDate()
  // console.log(meal)

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
    // console.log(newServing)
    setNutritionValues({
      ...nutritionValues,
     foodServing: newServing,
    });
    // console.log(nutritionValues)
  };

  useEffect(() => {
    const { foodServing } = nutritionValues
    const newKcal = kcal * (foodServing / 100)
    const newProtein = protein * (foodServing / 100)
    const newFat = fat * (foodServing / 100)
    const newCarbs = carbs * (foodServing / 100)

    setNutritionValues({
      ...nutritionValues,
      foodServing: foodServing,
      foodKcal: newKcal,
      foodProtein: newProtein,
      foodFat: newFat,
      foodCarbs: newCarbs,
    });
  }, [nutritionValues.foodServing])

  const handleAddFood = async (e) => {
    e.preventDefault()
    const { foodLabel, foodServing, foodKcal, foodProtein, foodFat, foodCarbs } = nutritionValues
    const notes = e.currentTarget.elements.notes.value
    console.log(notes)

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
        serving_amt: foodServing,
        notes: notes,
        user_id: user
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
        serving_amt: foodServing,
        [meal]: true,
        user_id: user,
        created_at: date
        }
      ])
      if (error2) {
        console.log(error2)
      }
    }
    catch (err) {
      console.log(err.message)
    }
    navigate('/')
  }

  const { foodServing, foodKcal, foodProtein, foodFat, foodCarbs } = nutritionValues;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        marginTop: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{marginBottom: "40px"}}>
        <ArrowBackIcon />
        Back
      </Button>
      <form id={id} onSubmit={handleAddFood}>
        <Typography variant="h6">{label}</Typography>
        <TextField
          type="number"
          name="serving"
          value={foodServing}
          onChange={handleServingChange}
          label="Serving (g)"
          variant="outlined"
          margin="normal"
        />
        <Typography>Calories: {Math.round(foodKcal)} kcal</Typography>
        <Typography>F: {Math.round(foodFat)}g</Typography>
        <Typography>C: {Math.round(foodCarbs)}g</Typography>
        <Typography>P: {Math.round(foodProtein)}g</Typography>
        <TextField
          type="text"
          name="notes"
          label="Notes"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          fullWidth
        />

        <Button type="submit" fullWidth 
          sx={{ marginTop: '10px',
            backgroundColor: `rgb(196, 155, 178)`, 
            color: `rgb(255,255,255)`, 
            '&:hover': {
            backgroundColor: `rgb(196, 155, 178)`, 
            color: `rgb(255,255,255)`}}}
          > Add
        </Button>

      </form>
    </Box>
  );

}

export default FoodAPIInfoAdd