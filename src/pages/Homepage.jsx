import MacroTrackingDisplay from "../components/MacroTrackingDisplay"
import Box from '@mui/material/Box';

const Homepage = () => {
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: '300px' }} >
        <MacroTrackingDisplay/>
      </Box>
    </>
  )
}

export default Homepage