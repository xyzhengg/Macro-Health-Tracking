import MacroTrackingDisplay from "../components/MacroTrackingDisplay"
import { Box } from '@mui/material'
import DateNavigation from "../components/DateNavigation"

const DayDisplay = () => {
  return (
    <>
      <Box>
        <DateNavigation/>
      </Box>
      <Box component="main" sx={{ bgcolor: 'background.default', p: 3, margin: 5}} >
        <MacroTrackingDisplay/>
      </Box>
    </>
  )
}

export default DayDisplay