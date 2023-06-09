import Login from "../components/Login"
import SignUp  from"../components/SignUp"
import { useState } from "react"
import { Grid } from "@mui/material"

const LoginSignUp = () => {
  const [hasAccount, setHasAccount] = useState(true)
  const toggleForm = () => {
    setHasAccount(!hasAccount);
  }

  return (
    <Grid container direction="row" justifyContent="space-around" alignItems="center" 
      style={{ height: '100vh'}} sx={{backgroundColor: 'rgb(234, 233, 239)'}}>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={3} sx={{border: '1px solid grey', borderRadius: 2, p: 10, backgroundColor: 'white'}}>
          {hasAccount ? 
          <Login toggleForm = {toggleForm}/> 
          : 
          <SignUp toggleForm = {toggleForm}/>
          }
        </Grid>
      </Grid>
  )
}

export default LoginSignUp