import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import { useGoal } from "../contexts/GoalProvider"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Grid, TextField } from "@mui/material"

const EditProfile = () => {
  const { user } = useAuth()
  const { goal, setGoal } = useGoal()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null)

  useEffect (() => {
    setLoading(true)
    const getProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profile')
          .select("*")
          .eq('user_id', user)
        if (error) {
          setError(error)
        } else if (data[0]){
          setLoading(false)
          setProfileData(data[0])
          // console.log(data[0])
        } else {
          setProfileData({
            first_name: "",
            last_name: "",
            goal_calories: "",
            goal_weight: "",
            fat: "",
            carbs: "",
            protein: ""
          })
        }
      } catch (err) {
        setError(err.message)
      }
    }
    getProfileData()
  }, [])

  const handleEditProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fields = Object.fromEntries(new FormData(e.target))
    try {
      const { data, error } = await supabase
      .from('user_profile')
      .update({ 
        first_name: fields.firstname,
        last_name: fields.lastname,
        goal_calories: fields.goalcalories,
        goal_weight: fields.goalweight,
        fat: fields.fat,
        carbs: fields.carbs,
        protein: fields.protein
       })
      .eq('user_id', user)
      if (error) {
        setError(error.message)
        console.log(error)
      } else {
        setGoal({
          goal_calories: fields.goalcalories,
          goal_weight: fields.goalweight,
          fat: fields.fat,
          carbs: fields.carbs,
          protein: fields.protein
        })
        setSuccess("Your profile is being updated! Redirecting...")
        navigate('/profile')
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
      {profileData && (
      <Grid container sx={{ maxWidth: 350, marginTop: 10}}>
        <form onSubmit={handleEditProfile}>
          <Typography variant="h4" align="center" gutterBottom> Edit Profile </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField label="First Name" name="firstname" variant="outlined" margin="normal" defaultValue={profileData.first_name} InputLabelProps={{ shrink: true }} fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Last Name" name="lastname" variant="outlined" margin="normal" defaultValue={profileData.last_name} InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Goal Weight (kg)" name="goalweight" type="number" variant="outlined" margin="normal" defaultValue={profileData.goal_weight} InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Calorie Intake (kcal)" name="goalcalories" type="number" variant="outlined" margin="normal" defaultValue={profileData.goal_calories } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Fat (g)" name="fat" type="number" variant="outlined" margin="normal" defaultValue={profileData.fat } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Carbohydrate (g)" name="carbs" type="number" variant="outlined" margin="normal" defaultValue={profileData.carbs } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Protein (g)" name="protein" type="number" variant="outlined" margin="normal" defaultValue={profileData.protein } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
            </Grid>
          </Grid>
        <Button type="submit" fullWidth 
          sx={{ marginTop: 5,
          backgroundColor: `rgb(196, 155, 178)`, 
          color: `rgb(255,255,255)`, 
          '&:hover': {
          backgroundColor: `rgb(196, 155, 178)`, 
          color: `rgb(255,255,255)`}}}
          > Save
        </Button>
      </form>
      {success && ( <Typography variant="body1" align="center" > {success} </Typography> )}
    </Grid>
    )}
  </Grid>
  )     
}

export default EditProfile

