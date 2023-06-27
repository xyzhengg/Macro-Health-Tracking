import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseAuth/supabaseClient"
import {Modal, Typography, TextField, InputBase, Button, Box, Grid, Table, TableBody, TableContainer, Paper } from '@mui/material';
import FoodAPIResultsCell from './FoodAPIResultsCell'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import FoodItemTableRow from './FoodItemTableRow';
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';
import { useAuth } from "../contexts/AuthProvider"

const FoodAPISearcherPage = () => {
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [filteredResults, setFilteredResults] = useState(null)
  const [searchTerm, setSearchTerm] = useState()
  const { meal } = useMeal()
  const { user } = useAuth()
  const { date, setDate } = useDate()
  const navigate = useNavigate()


  const [initialValues, setInitialValues] = useState({
    foodLabel: "",
    foodServing: "",
    foodKcal: "",
    foodProtein: "",
    foodFat: "",
    foodCarbs: "",
  })

  const [nutritionValues, setNutritionValues] = useState({
    foodLabel: "",
    foodServing: "",
    foodKcal: "",
    foodProtein: "",
    foodFat: "",
    foodCarbs: "",
  })

  const [onDisplay, setOnDisplay] = useState(null)
  const open = Boolean(onDisplay)
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  const handleSearchFood = async (e) => {
    e.preventDefault()
    const { search } = Object.fromEntries(new FormData(e.target))
    setSearchTerm(search)

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
      console.log(filteredResults)
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
        width: '100%',
      },
  }}))

  const handleSelectFood = (e, foodData) => {
    console.log(foodData)
    e.preventDefault()
    setOpenModal(true)
    setInitialValues({
      foodLabel: foodData.label,
      foodServing: 100,
      foodKcal: foodData.nutrients.ENERC_KCAL,
      foodProtein: foodData.nutrients.PROCNT,
      foodFat: foodData.nutrients.FAT,
      foodCarbs: foodData.nutrients.CHOCDF,
    })

    setNutritionValues({
      foodLabel: foodData.label,
      foodServing: 100,
      foodKcal: foodData.nutrients.ENERC_KCAL,
      foodProtein: foodData.nutrients.PROCNT,
      foodFat: foodData.nutrients.FAT,
      foodCarbs: foodData.nutrients.CHOCDF,
    })
  }

    const handleServingChange = (e) => {
      const newServing = e.target.value;
      setNutritionValues({
        ...nutritionValues,
       foodServing: newServing,
      });
    };

    useEffect(() => {
      const { foodServing } = nutritionValues
      const servingMultiplier = foodServing / initialValues.foodServing
      const newKcal = initialValues.foodKcal * servingMultiplier
      const newProtein = initialValues.foodProtein * servingMultiplier
      const newFat = initialValues.foodFat * servingMultiplier
      const newCarbs = initialValues.foodCarbs * servingMultiplier
  
      setNutritionValues((prevNutritionValues) => ({
        ...prevNutritionValues,
        foodServing: foodServing,
        foodKcal: newKcal,
        foodProtein: newProtein,
        foodFat: newFat,
        foodCarbs: newCarbs,
      }));
    }, [nutritionValues.foodServing])

    const handleSaveFood = async (e) => {
      e.preventDefault()
      const { foodLabel, foodServing, foodKcal, foodProtein, foodFat, foodCarbs } = nutritionValues
  
      console.log(foodLabel, foodServing, foodKcal, foodProtein, foodFat, foodCarbs)
      try {
        const { data, error } = await supabase
        .from('food')
        .insert([
          {food_name: foodLabel, 
          calories: foodKcal,
          fat: foodFat,
          protein: foodProtein,
          carbs: foodCarbs,
          serving_amt: foodServing,
          user_id: user
          }
        ])
        if (error) {
          console.log(error)
        }
        const { data: data2, error: error2 } = await supabase
        .from('diary')
        .insert([
          {food_name: foodLabel, 
          calories: foodKcal,
          fat: foodFat,
          protein: foodProtein,
          carbs: foodCarbs,
          serving_amt: foodServing,
          [meal]: true,
          user_id: user,
          created_at: date
          }
        ])
        if (error2) {
          console.log(error2)
        }
      }
      catch (err) {
        console.log(err.message)
      }
      navigate('/')
    }

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 7, marginTop: 5}}>
      <form onSubmit={handleSearchFood}>
        <Search sx={{ width: '600px'}}>
          <SearchIconWrapper>
              <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" name="search" sx={{ border: '1px solid #e0e0e0', width: '600px'}}/>
            <Button type="submit" sx={{ 
              height:"40px",
              backgroundColor: `rgb(196, 155, 178)`, 
              color: `rgb(255,255,255)`, 
              '&:hover': {
              backgroundColor: `rgb(196, 155, 178)`, 
              color: `rgb(255,255,255)`,
              transform: 'scale(1.05)'}}}
              > Search
            </Button>
        </Search>
        {error && <div> Error: {error} </div>}
      </form>
    </Box>

    {filteredResults && (
    <TableContainer component={Paper} sx={{ minWidth: 400, maxWidth: 800, display: 'flex', justifyContent: 'center' }}>
        <Table size="small">
          <FoodItemTableRow
            text={searchTerm.toUpperCase()}
          />
          <TableBody>
          {filteredResults.map((result) => (
            <FoodAPIResultsCell
            key = {result.food.foodId}
            id= {result.food.foodId}
            label = {result.food.label}
            kcal = {result.food.nutrients.ENERC_KCAL}
            fat = {result.food.nutrients.FAT}
            protein = {result.food.nutrients.PROCNT}
            carbs = {result.food.nutrients.CHOCDF}
            searchTerm = {searchTerm}
            handleClick={(e) => handleSelectFood(e, result.food)}
            serving = {result.food.servingSizes && result.food.servingSizes.find((serving) => serving.label === "gram")}
            />
          ))}  
          </TableBody>  
        </Table>
      </TableContainer>
    )}

    {filteredResults && (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
        <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
          <form onSubmit={handleSaveFood}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">{nutritionValues.foodLabel}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleServingChange}
                  label={`Serving size: g`}
                  name="serving_amt"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  defaultValue={initialValues.foodServing}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{ height: 40 }}
                />
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop: 5}}>
                <Typography>Calories: {Math.round(nutritionValues.foodKcal)}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>F: {Math.round(nutritionValues.foodFat)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>C: {Math.round(nutritionValues.foodCarbs)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>P: {Math.round(nutritionValues.foodProtein)}g</Typography>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth 
              sx={{ marginTop: 5,
                backgroundColor: `rgb(196, 155, 178)`, 
                color: `rgb(255,255,255)`, 
                '&:hover': {
                backgroundColor: `rgb(196, 155, 178)`, 
                color: `rgb(255,255,255)`}}}
              >
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </Modal>
    )}
  </>
  )
}

export default FoodAPISearcherPage