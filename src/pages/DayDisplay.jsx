import MacroTrackingDisplay from "../components/MacroTrackingDisplay"
import { Box, Grid } from '@mui/material'
import DateNavigation from "../components/DateNavigation"

const DayDisplay = () => {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}> 
      <Grid sx={{ marginTop: 3}}>
        <DateNavigation/>
      </Grid>
      <Grid> 
        <Box component="main" sx={{ bgcolor: 'background.default', p: 3, margin: 1}} >
          <MacroTrackingDisplay/>
        </Box>
      </Grid>
    </Grid>
  )
}

export default DayDisplay