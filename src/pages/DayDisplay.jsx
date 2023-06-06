import MacroTrackingDisplay from "../components/MacroTrackingDisplay"
import { Box } from '@mui/material'
import DateNavigation from "../components/DateNavigation"

const DayDisplay = () => {
  return (
    <>
      <Box>
        <DateNavigation/>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: '300px' }} >
        <MacroTrackingDisplay/>
      </Box>
    </>
  )
}

export default DayDisplay