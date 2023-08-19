import { useEffect, useState } from 'react'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const RecipeIngredientSearcherPage = ({ tabValue, handleTabValueChange }) => {

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#3c274a'
    }}},
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#9fa0c6',
            fontSize: '1.2rem',
            '&.Mui-selected': {
              color: '#3c274a',
            fontSize: '1.2rem'
    }}}}},
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{  bgcolor: 'background.paper', marginTop: 20, maxWidth: '80%', margin: '0 auto' }}>
          <Tabs value={tabValue} onChange={handleTabValueChange} centered sx={{margin: 'auto', marginTop: 5}}>
            <Tab label="My Food" />
            <Tab label="Food Library" />
          </Tabs>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default RecipeIngredientSearcherPage