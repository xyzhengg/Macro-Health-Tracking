import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeAPIResultsList from '../components/RecipeAPIResultsList'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {TextField, InputBase, Grid, FormGroup, FormControlLabel, Checkbox, Box, Button, Typography} from '@mui/material';

const RecipeAPISearcherPage = () => {
  const [results, setResults] = useState(null)
  const [filteredResults, setFilteredResults] = useState(null)
  const [error, setError] = useState(null)

  const handleSearchRecipes = async (e) => {
    e.preventDefault()
    const { keywords, calories, diet, allergies } = Object.fromEntries(new FormData(e.target))
    console.log(keywords, calories, diet, allergies)

    const url = `https://api.edamam.com/api/recipes/v2?type=public` 
      + (keywords ? `&q=${keywords}` : '')
      + `&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`
      + (calories ? `&calories=0-${calories}` : '')
      + (diet ? `&diet=${diet}` : '')
      + (allergies ? `&health=${allergies}` : '')

    console.log(url)

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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }))
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
  }))

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <form onSubmit={handleSearchRecipes}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, marginTop: 5 }}>
          <Search sx={{ width: '600px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" name="keywords" sx={{ border: '1px solid #e0e0e0', width: '800px' }} />
            <Button
              type="submit"sx={{
              height: "40px",
              backgroundColor: `rgb(196, 155, 178)`,
              color: `rgb(255,255,255)`,
              '&:hover': {
              backgroundColor: `rgb(196, 155, 178)`,
              color: `rgb(255,255,255)`,
              transform: 'scale(1.05)'
              }}}> Search
            </Button>
          </Search>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <TextField type="number" name="calories" label="Max calories /serve" variant="outlined" margin="normal"/>
        </Grid>
        <Grid container> 
          <Grid item xs={2}>
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
          <Grid container xs={10}justifyContent="space-around">
          {filteredResults && filteredResults.map((result) => (
            <Grid container justifyContent="flex-start" xs={3} key={result.recipe.uri.substring(result.recipe.uri.lastIndexOf("#") + 1)}>
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
      </form>
    </Grid>
  )
}

export default RecipeAPISearcherPage