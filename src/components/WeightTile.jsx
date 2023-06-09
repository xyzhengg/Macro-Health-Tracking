import { supabase } from "../supabaseAuth/supabaseClient"
import { useState, useEffect } from "react";
import { TextField, Stack, FormLabel, Grid, Typography, Box, Button } from "@mui/material";
import { useGoal } from "../contexts/GoalProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDate } from "../contexts/DateProvider";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const WeightTile = () => {
  const { user } = useAuth() 
  const { date, setDate } = useDate()
  const { goal } = useGoal()
  const [ weight, setWeight ] = useState()
  const [ editMode, setEditMode] = useState(false)
  const [weightDifference, setWeightDifference] = useState(0)

  useEffect(() => {
    const getWeightData = async () => {
      try {
        if (user && goal) {
          const { data, error } = await supabase
            .from('weight')
            .select('*')
            .eq('user_id', user)
            .lte('created_at', date.toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
  
          if (error) {
            console.log(error)
          } else if (data[0]) {
            setWeight(data[0])
            setWeightDifference((goal.goal_weight - data[0].kg) > 0 ? `+${goal.goal_weight - data[0].kg}` : goal.goal_weight - data[0].kg)
          } else {
            setWeight({ kg: 0 })
            setWeightDifference(0)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  
    getWeightData()
  }, [date, goal])

  const handleEditModeToggle = () => {
    setEditMode(!editMode)
  }

  const addWeight = async (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))
    // console.log(fields.newWeight)

    try {
      const { data: dataExist, error: dataExistError } = await supabase
        .from('weight')
        .select('*')
        .eq('user_id', user)
        .eq('created_at', date.toISOString())
      // console.log(dataExist)

      if (dataExistError) {
        console.log(dataExistError)
      } else {
        if (dataExist.length === 0) {
          const { data: addWeight, error: addWeightError } = await supabase
            .from('weight')
            .insert([
              {
                user_id: user,
                kg: fields.newWeight,
                created_at: date.toISOString(),
              },
            ]);
          // console.log(addWeight)
          setDate(new Date(date.getTime() + 10000))

          if (addWeightError) {
            console.log(addWeightError)
          }
        } else {
          try {
            const { data, error } = await supabase
              .from('weight')
              .update({ kg: fields.newWeight })
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
      {editMode && weight && (
        <Grid container direction="column" sx={{ border: '1px solid #ccc', borderRadius: '1rem', p: '2rem'}}>
          <Typography variant="subtitle1"> Weight </Typography>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <form onSubmit={addWeight} id="editWeightForm">
                <TextField
                  label="kg"
                  defaultValue={weight.kg}
                  variant="outlined"
                  size="small"
                  sx={{ width: '100px' }}
                  name="newWeight"
                />
              </form>
            </Grid>
            <Grid item>
              <Button type="submit" form="editWeightForm" sx={{
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
  
      {!editMode && weight && (
        <Grid container direction="column" sx={{ border: '1px solid #ccc', borderRadius: '1rem', p: '2rem'}}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6"> Weight </Typography>
            <IconButton onClick={handleEditModeToggle} >
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{weight.kg}kg</Typography>
          <Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Typography variant="body2">{weightDifference}kg left to target</Typography>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
    )}
    </>
  )
}

export default WeightTile

