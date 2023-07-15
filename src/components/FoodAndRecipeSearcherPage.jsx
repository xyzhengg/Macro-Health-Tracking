import { Box, createTheme, ThemeProvider } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import RecipeAPISearcherPage from '../pages/RecipeAPISearcherPage'
import FoodAPISearcher from './FoodAPISearcherPage'
import MyFoodSearcherPage from '../pages/MyFoodSearcherPage'
import MyRecipeSearcherPage from '../pages/MyRecipeSearcherPage'

const FoodAndRecipeSearcherPage = () => {
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue);
  } 

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
    <ThemeProvider theme={theme}>
      <Box sx={{  bgcolor: 'background.paper', marginTop: 20, maxWidth: '80%', margin: '0 auto' }}>
        <Tabs value={value} onChange={handleChange} centered sx={{margin: 'auto', marginTop: 5}}>
          <Tab label="My Food" />
          <Tab label="Food Library" />
          <Tab label="My Recipes" />
          <Tab label="Recipe Library" />
        </Tabs>
        <br/>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', margin: '0 auto'}}>
          {value === 0 && <MyFoodSearcherPage />}
          {value === 1 && <FoodAPISearcher/>}
          {value === 2 && <MyRecipeSearcherPage />}
          {value === 3 && <RecipeAPISearcherPage />}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default FoodAndRecipeSearcherPage