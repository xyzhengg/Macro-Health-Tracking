import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Paper, Card, Grid, TextField } from "@mui/material"

const InitialProfileSetup = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleSubmitProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fields = Object.fromEntries(new FormData(e.target))
    
    try {
      const { data, error } = await supabase
      .from('user_profile')
      .insert([
        {user_id: user,
        first_name: fields.firstname.charAt(0).toUpperCase() + fields.firstname.slice(1).toLowerCase(),
        last_name: fields.lastname.charAt(0).toUpperCase() + fields.lastname.slice(1).toLowerCase(),
        goal_weight: fields.goalweight,
        goal_calories: fields.goalcalories,
        fat: fields.fat,
        protein: fields.protein,
        carbs: fields.carbs
        }
      ])
      if (error) {
        setError(error.message)
        console.log(error)
      } else {
        setSuccess("Your profile is being created! Redirecting...")
        navigate('/')
      }
    }
    catch (err){
      setError(err.message)
      console.log(error)
    }    
    setLoading(false)
  }
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
      <Grid container sx={{ maxWidth: 350, marginTop: 10}}>
        <form onSubmit={handleSubmitProfile}>
          <Typography variant="h4" align="center" gutterBottom> Create Profile </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField label="First Name" name="firstname" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Last Name" name="lastname" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Goal Weight (kg)" name="goalweight" type="number" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Calorie Intake (kcal)" name="goalcalories" type="number" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Fat (g)" name="fat" type="number" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Carbohydrate (g)" name="carbs" type="number" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Protein (g)" name="protein" type="number" variant="outlined" margin="normal" required fullWidth sx={{ height: 40 }}/>
            </Grid>
          </Grid>
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 5 }}> Save </Button>
      </form>
      {success && ( <Typography variant="body1" align="center" > {success} </Typography> )}
    </Grid>
  </Grid>
  )     
}

export default InitialProfileSetup