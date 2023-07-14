import { supabase } from '../supabaseAuth/supabaseClient';
import { useMeal } from '../contexts/MealContext';
import { useAuth } from '../contexts/AuthProvider';
import { useDate } from '../contexts/DateProvider';
import { Grid, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

const CreateFoodForm = () => {
  const { meal } = useMeal()
  const { user } = useAuth()
  const { date } = useDate()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const handleAddCustomFood = async (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))
    const { calories, carbs, fat, measure, notes, protein, serving, title } = fields
    console.log(fields)

    try {
      const { data, error } = await supabase
      .from('food')
      .insert([
        {food_name: title, 
        calories: calories,
        fat: fat,
        protein: protein,
        carbs: carbs,
        serving_amt: serving,
        serving_measure: measure,
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
        {food_name: title, 
        calories: calories,
        fat: fat,
        protein: protein,
        carbs: carbs,
        serving_amt: serving,
        serving_measure: measure,
        [meal]: true,
        user_id: user,
        created_at: date
        }
      ])
      if (error2) {
        console.log(error2)
      } else {
        console.log(data2)
      }
    } catch (err) {
      console.log(err.message)
    }
    navigate("/")
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" >
        <Grid container sx={{ maxWidth: 400, marginTop: 7}} spacing={3}>
          <form onSubmit={handleAddCustomFood}>
          <Typography variant="h4" align="center" gutterBottom> Create Custom Food </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField label="Description" name="title" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Serving" name="serving" type="number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Measure" name="measure" placeholder="e.g. g, cup, oz, kg" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Calories (kcal)" name="calories" type="number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Protein (g)" name="protein" type="number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Fat (g)" name="fat" type="number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Carbs (g)" name="carbs" type="number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Notes" name="notes" variant="outlined" fullWidth multiline rows={3} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth sx={{
                marginTop: 2,
                backgroundColor: 'rgb(196, 155, 178)',
                color: 'rgb(255, 255, 255)',
                '&:hover': {
                backgroundColor: 'rgb(196, 155, 178)',
                color: 'rgb(255, 255, 255)'},
              }} >
                Next
              </Button>
            </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
    
  )
}

export default CreateFoodForm