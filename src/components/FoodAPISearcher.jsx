import { useState, useEffect } from 'react'
import axios from 'axios'
import FoodAPIResultsDisplay from './FoodAPIResultsDisplay'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';

const FoodAPISearcher = () => {
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [filteredResults, setFilteredResults] = useState(null)

  const handleSearchFood = async (e) => {
    e.preventDefault()
    const { search } = Object.fromEntries(new FormData(e.target))

    try {
      const res = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=c3a053e6&app_key=a5494242fbb8e5d5184b54cad1d5e4b6&ingr=${search}&nutrition-type=cooking`)
      console.log(res.data.hints)
      console.log(res.data)
      setResults(res.data.hints)
    } catch(err) {
      console.log(err)
      setError(err)
    }
  }

  useEffect(() => {
    if (results) {
      console.log(results)

      const filteredResults = results.filter((result, index, array) => {
        const firstIndex = array.findIndex((r) => r.food.foodId === result.food.foodId);
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

  return (
    <>
      <form onSubmit={handleSearchFood}>
        <Search>
          <SearchIconWrapper>
              <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} name="search" />
          <button type="submit"> Search </button>
        </Search>
        {error && <div> Error: {error} </div>}
      </form>
      <Grid container spacing={2}>
        {filteredResults && filteredResults.map((result) => (
          <Grid item xs={2} key={result.food.foodId}>
            <FoodAPIResultsDisplay
            key = {result.food.foodId}
            id= {result.food.foodId}
            label = {result.food.label}
            kcal = {result.food.nutrients.ENERC_KCAL}
            fat = {result.food.nutrients.FAT}
            protein = {result.food.nutrients.PROCNT}
            carbs = {result.food.nutrients.CHOCDF}
            serving = {result.food.servingSizes && result.food.servingSizes.find((serving) => serving.label === "Gram")}
            />
          </Grid>
          ))}
      </Grid>
    </>
  )
}

export default FoodAPISearcher

// search box
// search button
// results area
    // should be clickable/selectable to save
