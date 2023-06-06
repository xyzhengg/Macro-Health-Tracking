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
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <Card component={Paper} variant="outlined" sx={{ maxWidth: 400, marginTop: 10, padding: 6 }}>
        <Grid>
          <Typography variant="h5" align="center" padding={2}> Hi {profileData.first_name} {profileData.last_name} </Typography>
          <Typography variant="body1"> Your goal weight is {profileData.goal_weight}kg </Typography>
          <Typography variant="body1"> Daily calories is set at {profileData.goal_calories}kcal </Typography>
        </Grid>
        <Grid container justifyContent="center" alignSelf="center">
          <Button sx={{marginTop: 5}} onClick={(handleEditProfile)}> Edit </Button>
        </Grid>
      </Card>
    </Grid>
    
  )
}

export default ProfilePage