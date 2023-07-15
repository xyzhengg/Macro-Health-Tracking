import { useEffect, useState } from 'react'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import RecipeIngredientAPISearcher from '../components/RecipeIngredientAPISearcher'
import RecipeIngredientFoodSearcher from '../components/RecipeIngredientFoodSearcher'

const RecipeIngredientSearcherPage = ({}) => {

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue);
  } 

  const [initialFoodValues, setInitialFoodValues] = useState({
    foodLabel: "",
    foodServing: "",
    foodKcal: "",
    foodProtein: "",
    foodFat: "",
    foodCarbs: "",
  })

  const [nutritionFoodValues, setNutritionFoodValues] = useState({
    foodLabel: "",
    foodServing: "",
    foodKcal: "",
    foodProtein: "",
    foodFat: "",
    foodCarbs: "",
  })

  const [initialAPIFoodValues, setInitialAPIFoodValues] = useState({
    foodLabel: "",
    foodServing: "",
    foodKcal: "",
    foodProtein: "",
    foodFat: "",
    foodCarbs: "",
  })

  const [nutritionAPIFoodValues, setNutritionAPIFoodValues] = useState({
    foodLabel: "",
    foodServing: "",
    foodKcal: "",
    foodProtein: "",
    foodFat: "",
    foodCarbs: "",
  })

  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
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
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{  bgcolor: 'background.paper', marginTop: 20, maxWidth: '80%', margin: '0 auto' }}>
          <Tabs value={value} onChange={handleChange} centered sx={{margin: 'auto', marginTop: 5}}>
            <Tab label="My Food" />
            <Tab label="Food Library" />
          </Tabs>
          <br/>
          <Box sx={{ width: '100%', bgcolor: 'background.paper', margin: '0 auto'}}>
            {value === 0 && <RecipeIngredientFoodSearcher />}
            {value === 1 && <RecipeIngredientAPISearcher/>}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default RecipeIngredientSearcherPage