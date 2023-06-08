import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {InputBase, Button, TableRow, TableHead, Box, Grid, TableCell, Table, TableBody, TableContainer, Paper, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const RecipeAPIInfo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id, title, image, servings, fat, protein, carbs, calories, allergies, diets, ingredients, linkToDirections } = location.state
  
  return (
    <Grid id={id} container direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: 7 }}>
      <Grid container direction="row">
        <Grid item>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={5} sx={{ maxWidth: '900px', marginTop: 2 }}>
        <Grid item minHeight="120px" maxHeight="700px" display="flex" alignItems="center" justifyContent="center" xs={7}>
          <img src={image} loading="lazy" alt={`image of ${title}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">Ingredients:</Typography>
          <TableContainer sx={{ width: 400 }}>
            <Table>
              <TableBody>
                {ingredients && ingredients.map((ingredient) => (
                <TableRow key={ingredient.food}>
                  <TableCell>{ingredient.quantity}</TableCell>
                  <TableCell>{ingredient.measure !== '<unit>' ? ingredient.measure : ''}</TableCell>
                  <TableCell>{ingredient.food}</TableCell>
                  <TableCell>{ingredient.weight && Math.round(ingredient.weight)}g</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-between" spacing={3} sx={{ maxWidth: '900px', marginTop: 2 }}>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Calories/serve: {Math.round(calories)}kcal</Typography>
              <Typography variant="h6">Servings: {servings}</Typography>
            </Grid>
            <Grid item sx={{ marginTop: 5 }}>
              <Typography variant="h6">F: {Math.round(fat)}g</Typography>
              <Typography variant="h6">P: {Math.round(protein)}g</Typography>
              <Typography variant="h6">C: {Math.round(carbs)}g</Typography>
            </Grid>
            <Grid item sx={{ marginTop: 7 }}>
              <Button component="a" href={linkToDirections} variant="contained">
                Click here for directions
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Diet Considerations</Typography>
            </Grid>
            {diets && (
              <Grid item>
                {diets.map((diet) => (
                  <Typography variant="body1" key={diet}>
                    {diet}&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Allergy Considerations</Typography>
            </Grid>
            {allergies && (
              <Grid item>
                {allergies.map((allergen) => (
                  <Typography variant="body1" key={allergen}>
                    {allergen}&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      </Grid>
  )
}

export default RecipeAPIInfo