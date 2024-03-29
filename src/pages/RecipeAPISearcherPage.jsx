import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeAPIResultsList from '../components/RecipeAPIResultsList'
import SearchBar from '../components/SearchBar';
import {TextField, Grid, FormGroup, FormControlLabel, Checkbox, Box, Button, Typography} from '@mui/material';

const RecipeAPISearcherPage = () => {
  const [results, setResults] = useState(null)
  const [filteredResults, setFilteredResults] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const handleSearchRecipes = async (e) => {
    e.preventDefault()
    const { search, calories, diet, allergies } = Object.fromEntries(new FormData(e.target))
    console.log(search, calories, diet, allergies)

    const url = `https://api.edamam.com/api/recipes/v2?type=public` 
      + (search ? `&q=${search}` : '')
      + `&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`
      + (calories ? `&calories=0-${calories}` : '')
      + (diet ? `&diet=${diet}` : '')
      + (allergies ? `&health=${allergies}` : '')

    console.log(url)
    console.log(search)

    try {
      const res = await axios.get(url)
      console.log(res.data.hits)
      console.log(res.data._links.next)
      setResults(res.data.hits)
    } catch(err) {
      setError(err)
      console.log(error)
    }
  }

  useEffect(() => {
    if (results) {
      const filteredResults = results.filter((result, index, array) => {
        const firstIndex = array.findIndex((r) => r.recipe.uri === result.recipe.uri);
        return firstIndex === index;
      })
      setFilteredResults(filteredResults)
    }
  }, [results])

  const searchInputWidth = '600px'

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <form onSubmit={handleSearchRecipes}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, marginTop: 5 }}>
          <SearchBar 
            searchInputWidth={searchInputWidth}
          />
        </Grid>

        <Grid container> 
          <Grid item xs={3}>
            <TextField type="number" name="calories" label="Max calories /serve" variant="outlined" margin="normal"/>
            <Typography variant="h6" sx={{marginTop: 2}}> Diets </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="low-carb" name="diet" value="low-carb" />} label="Low Carb" sx={{ height: '28px' }} />
              <FormControlLabel control={<Checkbox id="low-fat" name="diet" value="low-fat" />} label="Low Fat" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="high-protein" name="diet" value="high-protein" />} label="High Protein" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="balanced" name="diet" value="balanced" />} label="Balanced" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="high-fiber" name="diet" value="high-fiber" />} label="High Fiber" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="low-sodium" name="diet" value="low-sodium" />} label="Low Sodium" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="paleo" name="allergies" value="paleo" />} label="Paleo" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="pescatarian" name="allergies" value="pescatarian" />} label="Pescatarian" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="vegan" name="allergies" value="vegan" />} label="Vegan" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="vegetarian" name="allergies" value="vegetarian" />} label="Vegetarian" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="pork-free" name="allergies" value="pork-free" />} label="Pork Free" sx={{ height: '28px' }}/>
            </FormGroup>
            <Typography variant="h6" sx={{marginTop: 2}}> Allergies </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="dairy-free" name="allergies" value="dairy-free" />} label="Dairy Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="egg-free" name="allergies" value="egg-free" />} label="Egg Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="gluten-free" name="allergies" value="gluten-free" />} label="Gluten Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="peanut-free" name="allergies" value="peanut-free" />} label="Peanut Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="shellfish-free" name="allergies" value="shellfish-free" />} label="Shellfish Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="crustacean-free" name="allergies" value="crustacean-free" />} label="Crustacean Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="soy-free" name="allergies" value="soy-free" />} label="Soy Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="sesame-free" name="allergies" value="sesame-free" />} label="Sesame Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="wheat-free" name="allergies" value="wheat-free" />} label="Wheat Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="fish-free" name="allergies" value="fish-free" />} label="Fish Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="lupine-free" name="allergies" value="lupine-free" />} label="Lupine Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="tree-nut-free" name="allergies" value="tree-nut-free" />} label="Tree Nut Free" sx={{ height: '28px' }}/>
              <FormControlLabel control={<Checkbox id="celery-free" name="allergies" value="celery-free" />} label="Celery Free" sx={{ height: '28px' }} />
              <FormControlLabel control={<Checkbox id="mustard-free" name="allergies" value="mustard-free" />} label="Mustard Free" sx={{ height: '28px' }}/>
            </FormGroup>
          </Grid>

          
          <Grid item xs={9}>
            <Grid container justifyContent="flex-start" spacing={3}>
            {filteredResults && filteredResults.map((result) => (
              <Grid item xs={4} key={result.recipe.uri.substring(result.recipe.uri.lastIndexOf("#") + 1)}>
                <RecipeAPIResultsList
                  key={result.recipe.uri.substring(result.recipe.uri.lastIndexOf("#") + 1)}
                  id={result.recipe.uri.substring(result.recipe.uri.lastIndexOf("#") + 1)}
                  title={result.recipe.label}
                  image={result.recipe.image}
                  totalCalories={parseFloat(result.recipe.calories.toFixed(2))}
                  fat={parseFloat(result.recipe.totalNutrients.FAT.quantity).toFixed(2)}
                  protein={parseFloat(result.recipe.totalNutrients.PROCNT.quantity).toFixed(2)}
                  carbs={parseFloat(result.recipe.totalNutrients.CHOCDF.quantity).toFixed(2)}
                  diet={result.recipe.dietLabels}
                  allergies={result.recipe.healthLabels}
                  servings={result.recipe.yield}              
                /> 
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default RecipeAPISearcherPage