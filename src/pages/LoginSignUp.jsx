import Login from "../components/Login"
import SignUp  from"../components/SignUp"
import { useState } from "react"
import { Grid, Box, Typography } from "@mui/material"

const LoginSignUp = () => {
  const [hasAccount, setHasAccount] = useState(true)
  const toggleForm = () => {
    setHasAccount(!hasAccount);
  }

  return (
  <>
    <Grid textAlign="center" sx={{backgroundColor: 'rgb(234, 233, 239)', paddingTop: 4, paddingBottom: 0}}>
      <Typography variant="h1"> Macro Health Tracking</Typography>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="center"
      style={{ height: '88vh'}} sx={{backgroundColor: 'rgb(234, 233, 239)'}}>
      <Grid sx={{border: '1px solid grey', borderRadius: 2, p: 10, backgroundColor: 'white', marginBottom: 4}}>
        {hasAccount ? 
        <Login toggleForm = {toggleForm}/> : <SignUp toggleForm = {toggleForm}/>
        }
      </Grid>
    </Grid>
  </>
  )
}

export default LoginSignUp