import { supabase } from '../supabaseAuth/supabaseClient';
import { useMeal } from '../contexts/MealContext';
import { useAuth } from '../contexts/AuthProvider';
import { useDate } from '../contexts/DateProvider';
import { useRecipeIngredients } from '../contexts/RecipeIngredientsContext';
import { useEffect, useState } from 'react'
import { Grid, TextField, Button, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import RecipeIngredientSearcherPage from '../pages/RecipeIngredientSearcherPage'

const CreateRecipeForm = ({handleCancel}) => {
  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const [goToRecipeIngredientSearcherPage, setGoToRecipeIngredientSearcherPage] = useState(false)

  const {recipeIngredients, setRecipeIngredients} = useRecipeIngredients()

  const [ingredientsList, setIngredientsList] = useState([])

  const [ingredientsTotals, setIngredientsTotals] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  })
  
  const [accCalories, setAccCalories] = useState(0)
  const [accFat, setAccFat] = useState(0)
  const [accCarbs, setAccCarbs] = useState(0)
  const [accProtein, setAccProtein] = useState(0)

  // useEffect(() => {
  //   const calculateIngredientTotals = () => {
  //     const initialTotals = {
  //       calories: 0,
  //       fat: 0,
  //       carbs: 0,
  //       protein: 0,
  //     };
  //     const updatedTotals = ingredientData.reduce((acc, item) => {
  //       acc.calories += item.calories
  //       acc.fat += item.fat
  //       acc.carbs += item.carbs
  //       acc.protein += item.protein
  //       return acc
  //     }, initialTotals)
  //     setIngredientTotals(updatedTotals)
  //   }
  //   calculateIngredientTotals()
  // }, [ingredientData])

  const handleGoToIngredientSearch = async (e) => {
    setGoToRecipeIngredientSearcherPage(true)
  }
  
  const handleAddCustomRecipe = async (e) => {

  }
 
  return (
    <>
      { goToRecipeIngredientSearcherPage ? 
      <RecipeIngredientSearcherPage/> 
      :
      (
      <Grid container direction="column" justifyContent="center" alignItems="center" >
        <Grid container sx={{ maxWidth: 600, marginTop: 7}} spacing={3}>
          <form onSubmit={handleAddCustomRecipe}>
          <Typography variant="h4" align="center" gutterBottom> Create Custom Recipe </Typography>
          <Grid container spacing={2}>
            <Box sx={{ m: 5, p: 3, border: '1px black solid', borderRadius: '1rem', width: 600}}>
              <Grid item xs={12} sx={{marginBottom: 2}}>
                <TextField label="Name" name="title" variant="outlined" fullWidth/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Number of Servings" name="serving" type="number" variant="outlined" fullWidth />
              </Grid>
            </Box>
            
            <Box sx={{ m: 5, marginTop: 0, p: 3, border: '1px black solid', borderRadius: '1rem', width: 600}}>
              <Typography variant="h6" align="left" gutterBottom> Ingredients </Typography>
              <Button fullWidth onClick={handleGoToIngredientSearch} sx={{
                marginTop: 2,
                backgroundColor: 'rgb(159, 160, 198)',
                color: 'rgb(255, 255, 255)',
                '&:hover': {
                backgroundColor: 'rgb(159, 160, 198)',
                color: 'rgb(255, 255, 255)'},
              }}>
                + Add Ingredient 
              </Button>

            </Box>

            <Box sx={{ m: 5, marginTop: 0, p: 3, border: '1px black solid', borderRadius: '1rem', width: 600}}>
              <Grid item xs={12}>
                <TextField label="Calories (kcal)" name="calories" type="number" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Protein (g)" name="protein" type="number" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Fat (g)" name="fat" type="number" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Carbs (g)" name="carbs" type="number" variant="outlined" fullWidth />
              </Grid>
            </Box>
            
            <Box sx={{ m: 5, marginTop: 0, p: 3, border: 'none', width: 600}}>
              <Grid item xs={12}>
                <Button type="submit" fullWidth sx={{
                  marginTop: 2,
                  backgroundColor: 'rgb(196, 155, 178)',
                  color: 'rgb(255, 255, 255)',
                  '&:hover': {
                  backgroundColor: 'rgb(196, 155, 178)',
                  color: 'rgb(255, 255, 255)'},
                }} >
                  Next
                </Button>

                <Button onClick ={handleCancel} fullWidth sx={{
                  marginTop: 2,
                  backgroundColor: 'rgb(175, 194, 214)',
                  color: 'rgb(255, 255, 255)',
                  '&:hover': {
                  backgroundColor: 'rgb(175, 194, 214)',
                  color: 'rgb(255, 255, 255)'},
                }} >
                  Cancel
                </Button>
              </Grid>
            </Box>
            </Grid>
          </form>
        </Grid>
      </Grid>
      )}
    </>
  )
}

export default CreateRecipeForm