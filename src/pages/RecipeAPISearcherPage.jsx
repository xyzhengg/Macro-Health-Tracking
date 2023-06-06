import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeAPIResultsList from '../components/RecipeAPIResultsList'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const RecipeAPISearcherPage = () => {
  const [results, setResults] = useState(null)
  const [filteredResults, setFilteredResults] = useState(null)
  const [nextLink, setNextLink] = useState(null)
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
      setNextLink(res.data._links.next.href)
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
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const drawerWidth = 150;

  return (
    <>
      <form onSubmit={handleSearchRecipes}>
        <Search>
          <SearchIconWrapper>
              <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase name="keywords" placeholder="Search by keywords" inputProps={{ 'aria-label': 'search' }}/>
        </Search>

        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
        </AppBar>

        <div>
          <label htmlFor="calories"> Max calories /serve: &nbsp;&nbsp;</label>
          <input type="number" name="calories"/>        
        </div>

        <h3> Diets </h3>
        <FormGroup>
          <FormControlLabel control={<Checkbox id="low-carb" name="diet" value="low-carb" />} label="Low Carb" />
          <FormControlLabel control={<Checkbox id="low-fat" name="diet" value="low-fat" />} label="Low Fat" />
          <FormControlLabel control={<Checkbox id="high-protein" name="diet" value="high-protein" />} label="High Protein" />
          <FormControlLabel control={<Checkbox id="balanced" name="diet" value="balanced" />} label="Balanced" />
          <FormControlLabel control={<Checkbox id="high-fiber" name="diet" value="high-fiber" />} label="High Fiber" />
          <FormControlLabel control={<Checkbox id="low-sodium" name="diet" value="low-sodium" />} label="Low Sodium" />
          <FormControlLabel control={<Checkbox id="paleo" name="diet" value="paleo" />} label="Paleo" />
          <FormControlLabel control={<Checkbox id="pescatarian" name="diet" value="pescatarian" />} label="Pescatarian" />
          <FormControlLabel control={<Checkbox id="vegan" name="diet" value="vegan" />} label="Vegan" />
          <FormControlLabel control={<Checkbox id="vegetarian" name="diet" value="vegetarian" />} label="Vegetarian" />
          <FormControlLabel control={<Checkbox id="pork-free" name="diet" value="pork-free" />} label="Pork Free" />
          <FormControlLabel control={<Checkbox id="mustard-free" name="allergies" value="mustard-free" />} label="Mustard Free" />
        </FormGroup>

        <h3> Allergies </h3>
        <FormGroup>
          <FormControlLabel control={<Checkbox id="dairy-free" name="allergies" value="dairy-free" />} label="Dairy Free" />
          <FormControlLabel control={<Checkbox id="egg-free" name="allergies" value="egg-free" />} label="Egg Free" />
          <FormControlLabel control={<Checkbox id="gluten-free" name="allergies" value="gluten-free" />} label="Gluten Free" />
          <FormControlLabel control={<Checkbox id="peanut-free" name="allergies" value="peanut-free" />} label="Peanut Free" />
          <FormControlLabel control={<Checkbox id="shellfish-free" name="allergies" value="shellfish-free" />} label="Shellfish Free" />
          <FormControlLabel control={<Checkbox id="crustacean-free" name="allergies" value="crustacean-free" />} label="Crustacean Free" />
          <FormControlLabel control={<Checkbox id="soy-free" name="allergies" value="soy-free" />} label="Soy Free" />
          <FormControlLabel control={<Checkbox id="sesame-free" name="allergies" value="sesame-free" />} label="Sesame Free" />
          <FormControlLabel control={<Checkbox id="wheat-free" name="allergies" value="wheat-free" />} label="Wheat Free" />
          <FormControlLabel control={<Checkbox id="fish-free" name="allergies" value="fish-free" />} label="Fish Free" />
          <FormControlLabel control={<Checkbox id="lupine-free" name="allergies" value="lupine-free" />} label="Lupine Free" />
          <FormControlLabel control={<Checkbox id="tree-nut-free" name="allergies" value="tree-nut-free" />} label="Tree Nut Free" />
          <FormControlLabel control={<Checkbox id="celery-free" name="allergies" value="celery-free" />} label="Celery Free" />
          <FormControlLabel control={<Checkbox id="mustard-free" name="allergies" value="mustard-free" />} label="Mustard Free" />
        </FormGroup>

        <input type="submit"/>
        <input type="reset"/>
      </form>

      {filteredResults && filteredResults.map((result) => (
      <RecipeAPIResultsList
        key={result.recipe.uri.substring(result.recipe.uri.lastIndexOf("#") + 1)}
        id={result.recipe.uri.substring(result.recipe.uri.lastIndexOf("#") + 1)}
        title = {result.recipe.label}
        image = {result.recipe.image}
        totalCalories = {parseFloat((result.recipe.calories).toFixed(2))}
        fat = {parseFloat(result.recipe.totalNutrients.FAT.quantity).toFixed(2)}
        protein = {parseFloat(result.recipe.totalNutrients.PROCNT.quantity).toFixed(2)}
        carbs = {parseFloat(result.recipe.totalNutrients.CHOCDF.quantity).toFixed(2)}
        diet = {result.recipe.dietLabels}
        allergies = {result.recipe.healthLabels}
        servings = {result.recipe.yield}
      />
      ))}
      {nextLink && <a href={nextLink}> Next Page </a>}
    </>
  )
}

export default RecipeAPISearcherPage