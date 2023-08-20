import { supabase } from '../supabaseAuth/supabaseClient';
import { useMeal } from '../contexts/MealContext';
import { useAuth } from '../contexts/AuthProvider';
import { useDate } from '../contexts/DateProvider';
import { useRecipeIngredients } from '../contexts/RecipeIngredientsContext';
import { useEffect, useState } from 'react'
import { Grid, TextField, Button, Typography, Box, Table, TableBody, TableCell, TableRow } from '@mui/material'
import RecipeIngredientEditDeleteButton from './RecipeIngredientEditDeleteButton';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const CreateRecipeForm = ({handleCancel, handleSearchIngredients, recipeIngredients, handleDelete, recipeIngredientTotals, handleAddCustomRecipe, handleChangeRecipeName, handleChangeRecipeServings, customRecipeServings, customRecipeName, foodData, setFoodData }) => {
  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    height: '30px',
    '& > *': { // Apply styles to all child (*) elements of this (&)
      width: '100%',
      whiteSpace: 'nowrap', 
      overflow: 'hidden',
      textOverflow: 'ellipsis', 
      padding: '4px',
    },
  }));

  return (
    <>
        <Grid container direction="column" justifyContent="center" alignItems="center" >
        <Grid container sx={{ maxWidth: 700, marginTop: 7}} spacing={3}>
          <form onSubmit={handleAddCustomRecipe}>
          <Typography variant="h4" align="center" gutterBottom> Create Custom Recipe </Typography>
          <Grid container spacing={2}>
            <Box sx={{ m: 5, p: 3, border: '1px black solid', borderRadius: '1rem', width: 700}}>
              <Grid item xs={12} sx={{marginBottom: 2}}>
                <TextField label="Name" name="title" variant="outlined" fullWidth value={customRecipeName}
                onChange={handleChangeRecipeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Number of Servings" name="serving" type="number" value={customRecipeServings} variant="outlined" fullWidth 
                onChange={handleChangeRecipeServings}/>
              </Grid>
            </Box>

            <Box sx={{ m: 5, marginTop: 0, p: 3, border: '1px black solid', borderRadius: '1rem', width: 700}}>
              <Typography variant="h6" align="left" gutterBottom> Ingredients </Typography>
              <Table>
                <TableBody>
               {recipeIngredients.map((eachIngredient) => (
                  <StyledTableRow key={eachIngredient.id} id={eachIngredient.id} sx={{width: 700}}>
                    <TableCell>{eachIngredient.food_name}</TableCell>
                    <TableCell align="left">F: {eachIngredient.fat.toFixed(1)}</TableCell>
                    <TableCell align="left">C: {eachIngredient.carbs.toFixed(1)}</TableCell>
                    <TableCell align="left">P: {eachIngredient.protein.toFixed(1)}</TableCell>
                    <TableCell align="left">kCal: {eachIngredient.calories.toFixed(1)}</TableCell>
                    <TableCell align="left">
                      <RecipeIngredientEditDeleteButton id={eachIngredient.id} foodData={foodData} setFoodData={setFoodData}/>
                    </TableCell>
                  </StyledTableRow>
                  ))}
                  <StyledTableRow sx={{width: 700}}>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}> Total: </TableCell>
                    <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '16px' }}>F: {recipeIngredientTotals.fat.toFixed(1)} </TableCell>
                    <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '16px' }}>C:  {recipeIngredientTotals.carbs.toFixed(1)} </TableCell>
                    <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '16px' }}>P: {recipeIngredientTotals.protein.toFixed(1)} </TableCell>
                    <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '16px' }}>kCal: {recipeIngredientTotals.calories.toFixed(1)} </TableCell>
                    <TableCell align="left"></TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              
              <Button fullWidth onClick={handleSearchIngredients} sx={{
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
            
            <Box sx={{ m: 5, marginTop: 0, p: 3, border: 'none', width: 700}}>
              <Grid item xs={12}>
                <Button type='submit' fullWidth sx={{
                  marginTop: 2,
                  backgroundColor: 'rgb(196, 155, 178)',
                  color: 'rgb(255, 255, 255)',
                  '&:hover': {
                  backgroundColor: 'rgb(196, 155, 178)',
                  color: 'rgb(255, 255, 255)'},
                }} >
                  Add
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
    </>
  )
}

export default CreateRecipeForm