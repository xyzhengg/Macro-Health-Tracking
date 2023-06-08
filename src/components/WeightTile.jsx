import { supabase } from "../supabaseAuth/supabaseClient"
import { useState, useEffect } from "react";
import { LinearProgress, Stack, FormLabel, Grid, Typography, Box, Button } from "@mui/material";
import { useGoal } from "../contexts/GoalProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDate } from "../contexts/DateProvider";

const WeightTile = () => {
  const { user } = useAuth() 
  const { date } = useDate()
  const { goal } = useGoal()
  const [ weight, setWeight ] = useState()
  const [weightDifference, setWeightDifference] = useState(0)

  useEffect(() => {
    console.log(date.toISOString())
    const getWeightData = async () => {
      try {
        const { data, error } = await supabase
        .from('weight')
        .select('*')
        .eq('user_id', user)
        .lte('created_at', date.toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        if (error) {
          console.log(error)
        } else {
          setWeight(data[0])
          setWeightDifference((goal.goal_weight - data[0].kg) > 0 ? `+${goal.goal_weight - data[0].kg}` : goal.goal_weight - data[0].kg)
          console.log(goal.goal_weight - data[0].kg)
        }
      } catch (err) {
        console.log(err)
      }
    } 
    getWeightData()
  }, [date])

  const handleAddWeight = () => {

  }
  return (
    <>
    { weight && (
      <Grid container direction="column" sx={{ border: '1px solid #ccc', borderRadius: '1rem', p: '2rem'}}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">{weight.kg}kg</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained">+</Button>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Typography variant="body2"> {weightDifference}kg left to target</Typography>
        </Grid>
      </Grid>
    </Grid>
    )}
    </>
    
  )
}

export default WeightTile


