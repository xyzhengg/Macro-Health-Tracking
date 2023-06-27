import { Box, Typography } from "@mui/material"
const NotFound = () => {
  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])
  
  return (
    <Box sx={{ marginTop: 10}}>
      <Typography variant="h4" sx={{ color: 'grey' }}> 404 Not Found</Typography>
    </Box>
  )
}

export default NotFound