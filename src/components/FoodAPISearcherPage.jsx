import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseAuth/supabaseClient"
import { Box, Grid } from '@mui/material';
import FoodAPIResultsTable from './FoodAPIResultsTable';
import FoodAPIServingsModal from './FoodAPIServingsModal';
import SearchBar from './SearchBar';
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
    
  const searchInputWidth = '600px'

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 7, marginTop: 5}}>
      <Grid item>
          <form onSubmit={handleSearchFood}>
            <SearchBar 
              searchInputWidth = {searchInputWidth}
            />
          </form>
        </Grid>
    </Box>

    {filteredResults && <FoodAPIResultsTable
      searchTerm = {searchTerm}
      filteredResults = {filteredResults}
      handleSelectFood = {handleSelectFood}
    />
    }

    {filteredResults && 
      <FoodAPIServingsModal
      handleSubmit = {handleSaveFood}
      handleServingChange = {handleServingChange}
      nutritionValues = {nutritionValues}
      initialValues = {initialValues}
      handleCloseModal = {handleCloseModal}
      setOpenModal = {setOpenModal}
      openModal = {openModal}
      />
    }
  </>
  )
}

export default FoodAPISearcherPage