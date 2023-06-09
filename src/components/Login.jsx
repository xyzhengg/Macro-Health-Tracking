import { useState, useEffect } from 'react'
import { supabase } from '../supabaseAuth/supabaseClient';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useGoal } from '../contexts/GoalProvider';
import { Button, Typography, Grid, TextField } from "@mui/material"

const Login = ({ toggleForm }) => {
  const {session, setSession} = useAuth(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useAuth()
  const { goal } = useGoal()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSession(false)
    const fields = Object.fromEntries(new FormData(e.target))

    try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: fields.email,
      password: fields.password,
    })
    if (error) {
      setError(error.message)
      console.log(error.message)
    } else {
      setUser(data.user.id)
      setSession(true)
      console.log(data.user.id)
      navigate('/')
    }
    } 
  catch (err) {
    setError(err.message)
    console.log(err.message)
  }
  setLoading(false)
  }
  
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <form onSubmit={handleLogin}>
        <Typography variant="h2" align="center" gutterBottom> Login </Typography>
        <Grid container spacing={5} sx={{ maxWidth: 600, marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField label="Email" name="email" type="email" variant="outlined" margin="normal" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" name="password" type="password" variant="outlined" margin="normal" fullWidth />
          </Grid>
        </Grid>
        {session && <Typography variant="body1">Sign in successful! Redirecting...</Typography>}
        {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
        <Button type="submit" fullWidth
          sx={{
            height: '50px',
            marginTop: 5,
            backgroundColor: 'rgb(196, 155, 178)',
            color: 'rgb(255, 255, 255)',
            '&:hover': {
              backgroundColor: 'rgb(196, 155, 178)',
              color: 'rgb(255, 255, 255)',
            },
          }}
        >
          Login
        </Button>
      </form>
      <Button onClick={toggleForm} sx={{marginTop: 4}}> Create new account </Button>
    </Grid>
  )
}

export default Login