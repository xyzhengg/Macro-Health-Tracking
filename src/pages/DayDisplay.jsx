import MacroTrackingDisplay from "../components/MacroTrackingDisplay"
import { Box, Grid } from '@mui/material'
import DateNavigation from "../components/DateNavigation"
import CalorieProgress from "../components/CalorieProgress"

const DayDisplay = () => {
  return (
    <Grid container direction="row">
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}> 
        <Grid item sx={{ marginTop: 7}}>
          <DateNavigation/>
        </Grid>
        <Grid item > 
          <Box component="main" sx={{ bgcolor: 'background.default', p: 3, margin: 1}} >
            <MacroTrackingDisplay/>
          </Box>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <CalorieProgress/>
      </Grid>
    </Grid>
  )
}

export default DayDisplay