import { supabase } from '../supabaseAuth/supabaseClient';
import { useState, useEffect } from 'react';
import { Button, Typography, Grid, TextField } from "@mui/material"
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SignUp = ({toggleForm}) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))

    try {
      const { data, error } = await supabase.auth.signUp(
      {
        email: fields.email,
        password: fields.password,
      }) 
      if (error) {
        setError(error.message)
        console.log(error)
      }
    } 
    catch (err) {
      setError(err.message)
      console.log(err.message)
    }
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <form onSubmit={handleSignUp}>
      <Typography variant="h2" align="center" gutterBottom>Sign Up</Typography>
      <Grid container spacing={5} sx={{ maxWidth: 600, marginTop: 2 }}>
        <Grid item xs={12}>
          <TextField label="Email" name="email" type="email" variant="outlined" margin="normal" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" name="password" type="password" variant="outlined" margin="normal" fullWidth />
        </Grid>
      </Grid>
      {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
      <Button type="submit" fullWidth
        sx={{
          height: '50px',
          marginTop: 5,
          backgroundColor: 'rgb(154, 198, 199)',
          color: 'rgb(255, 255, 255)',
          '&:hover': {
            backgroundColor: 'rgb(154, 198, 199)',
            color: 'rgb(255, 255, 255)',
          },
        }}
      >
        Sign Up
      </Button>
    </form>
    <Button onClick={toggleForm} sx={{marginTop: 4}}> Have an account? Login here </Button>
  </Grid>
  )
}

export default SignUp


