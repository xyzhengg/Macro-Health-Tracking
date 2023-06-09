import { supabase } from "../supabaseAuth/supabaseClient"
import { useState, useEffect } from "react";
import { TextField, Stack, FormLabel, Grid, Typography, Box, Button } from "@mui/material";
import { useGoal } from "../contexts/GoalProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDate } from "../contexts/DateProvider";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const CaloriesTile = ( { totalCalories} ) => {
  const { user } = useAuth() 
  const { date, setDate } = useDate()
  const { goal } = useGoal()
  const [ calories, setCalories ] = useState()
  const [ editMode, setEditMode] = useState(false)

  useEffect(() => {
    // console.log(date.toISOString())
    const getCalorieData = async () => {
      try {
        const { data, error } = await supabase
        .from('calories_out')
        .select('*')
        .eq('user_id', user)
        .eq('created_at', date.toISOString())
        .limit(1)
        if (error) {
          console.log(error)
        } else if (data[0]) {
          setCalories(data[0])
        }else {
          setCalories({calories: 0})
          console.log(data[0])
        }
      } catch (err) {
        console.log(err)
      }
    } 
    getCalorieData()
  }, [date])

  const handleEditModeToggle = () => {
    setEditMode(!editMode)
  }

  const addCalories = async (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))
    // console.log(fields.newWeight)
    try {
      const { data: dataExist, error: dataExistError } = await supabase
        .from('calories_out')
        .select('*')
        .eq('user_id', user)
        .eq('created_at', date.toISOString())
        .limit(1)
      // console.log(dataExist)

      if (dataExistError) {
        console.log(dataExistError)
      } else {
        if (dataExist.length === 0) {
          const { data: addCalories, error: addCaloriesError } = await supabase
            .from('calories_out')
            .insert([
              {
                user_id: user,
                calories: fields.newCalories,
                created_at: date.toISOString(),
              },
            ]);
          setDate(new Date(date.getTime() + 10000))

          if (addCaloriesError) {
            console.log(addCaloriesError)
          }
        } else {
          try {
            const { data, error } = await supabase
              .from('calories_out')
              .update({ calories: fields.newCalories })
              .eq('user_id', user)
              .eq('created_at', date.toISOString())
            // console.log(data)
            if (error) {
              console.log(error)
            } else{
              setDate(new Date(date.getTime() + 10000))
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    handleEditModeToggle()
  }

  return (
    <>
      {editMode && calories && (
        <Grid container direction="column" sx={{ border: '1px solid #ccc', borderRadius: '1rem', p: '2rem'}}>
          <Typography variant="h6"> Calories </Typography>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <form onSubmit={addCalories} id="editCaloriesForm">
                <TextField
                  label="kcal"
                  defaultValue={calories.calories}
                  variant="outlined"
                  size="small"
                  sx={{ width: '100px' }}
                  name="newCalories"
                />
              </form>
            </Grid>
            <Grid item>
              <Button type="submit" form="editCaloriesForm" sx={{
                backgroundColor: `rgb(196, 155, 178)`, 
                color: `rgb(255,255,255)`, 
                '&:hover': {
                  backgroundColor: `rgb(196, 155, 178)`, 
                color: `rgb(255,255,255)`,
                transform: 'scale(1.05)'}}}
              > Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
  
      {!editMode && calories && (
        <Grid container direction="column" sx={{ border: '1px solid #ccc', borderRadius: '1rem', p: '2rem'}}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6"> Calories </Typography>
            <Grid>
              <IconButton onClick={handleEditModeToggle} >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          
          <Grid container direction="row" justifyContent="space-between" alignItems="center" >
            <Grid item>
              <Typography variant="body2">In </Typography>
              <Typography variant="h5">{totalCalories} </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Out </Typography>
              <Typography variant="h5">{calories.calories} </Typography>
            </Grid>
            
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default CaloriesTile


