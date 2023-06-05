import { Box } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import RecipeAPISearcherPage from '../pages/RecipeAPISearcherPage'
import FoodAPISearcher from './FoodAPISearcher'

const FoodAndRecipeSearcherPage = () => {
  const [value, setValue] = useState(1)

  const handleChange = (e, newValue) => {
    setValue(newValue);
  } 

  return (
    <>
    <Box sx={{ bgcolor: 'background.paper', marginTop: '20px', maxWidth: '80%', margin: '0 auto' }}>
      <Tabs value={value} onChange={handleChange} centered sx={{margin: '0 auto'}}>
        <Tab label="My Food" />
        <Tab label="Food Library" />
        <Tab label="My Recipes" />
        <Tab label="Recipe Library" />
      </Tabs>
      <br/>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', paddingLeft: '180px', margin: '0 auto'}}>
        {value === 0 && <MyFoodComponent />}
        {value === 1 && <FoodAPISearcher/>}
        {value === 2 && <MyRecipesComponent />}
        {value === 3 && <RecipeAPISearcherPage />}
      </Box>
    </Box>
    </>
  )
}

export default FoodAndRecipeSearcherPage