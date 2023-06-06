import { useAuth } from "../contexts/AuthProvider"
import { Button, Typography, Paper, Card, Grid } from "@mui/material"
import { supabase } from "../supabaseAuth/supabaseClient"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState([])
  const navigate = useNavigate()
  
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
        } else {
          setLoading(false)
          setProfileData(data[0])
        }
      } catch (err) {
        setError(err.message)
      }
    }
    getProfileData()
  }, [])

  const handleEditProfile = () => {
    navigate('/profile/edit')
  }
  

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Card component={Paper} variant="outlined" sx={{ width: 350, marginTop: 10, padding: 6 }}>
        <Typography variant="h5" align="center" padding={2}> Hi {profileData.first_name} {profileData.last_name} </Typography>
        <Typography vairant="body1">
          <Grid container justifyContent="space-between" alignItems="center" sx={{marginBottom: 1}}>
            <Grid item> Your goal weight is </Grid>
            <Grid item> {profileData.goal_weight}kg </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" sx={{marginBottom: 1}}>
            <Grid item> Daily calories is set at </Grid>
            <Grid item> {profileData.goal_calories}kcal </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" sx={{marginBottom: 1}}>
            <Grid item> Daily fat is set at </Grid>
            <Grid item> {profileData.fat}g </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" sx={{marginBottom: 1}}>
            <Grid item> Daily carbohydrate is set at </Grid>
            <Grid item> {profileData.carbs}g </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item> Daily protein is set at </Grid>
            <Grid item> {profileData.protein}g </Grid>
          </Grid>
        </Typography>
        <Grid container justifyContent="center" alignSelf="center">
          <Button variant="contained" fullWidth sx={{marginTop: 5}} onClick={(handleEditProfile)}> Edit </Button>
        </Grid>
      </Card>
    </Grid>
    
  )
}

export default ProfilePage