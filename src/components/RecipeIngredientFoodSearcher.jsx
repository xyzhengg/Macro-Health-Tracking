import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import {Modal, Typography, TextField, InputBase, Button, Box, Grid, Table, TableBody, TableContainer, Paper } from '@mui/material';
import SearchBar from "../components/SearchBar";
import AddCustomItemButton from "../components/AddCustomItemButton";
import MyFoodItemCell from "../components/MyFoodItemCell";
import MyFoodServingsModal from "../components/MyFoodServingsModal";
import FoodItemTableRow from "../components/FoodItemTableRow";
import CreateFoodForm from "../components/CreateFoodForm";
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';


const RecipeIngredientFoodSearcher = () => {
  const { user } = useAuth()
  const { meal } = useMeal()
  const { setDate, date } = useDate()
  const [myFoodData, setMyFoodData] = useState()
  const [mySearchResult, setMySearchResult] = useState()
  const [searching, setSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState()
  const [showCreateFoodForm, setShowCreateFoodForm] = useState(false)
  const navigate = useNavigate()

  const [foodData, setFoodData] = useState({
    food_name: "",
    serving_amt: "",
    serving_measure: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
    meal: ""
  })

  const [initialFoodData, setInitialFoodData] = useState('')
  const [onDisplay, setOnDisplay] = useState(null)
  const open = Boolean(onDisplay)
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  useEffect(() => {
    const getMyFoods = async () => {
      try {
        const { data, error } = await supabase
        .from('food')
        .select('*')
        .eq('user_id', user)
        .order('food_name', { ascending: true })
        if (error) {
          console.log(error)
        } else {
          const sortedData = {}
          for (const food of data) {
            const letter = food.food_name.charAt(0).toUpperCase()
            if (!sortedData[letter]) {
              sortedData[letter] = []
            }
            sortedData[letter].push(food)
          }
          setMyFoodData(Object.entries(sortedData))
          // console.log(sortedData)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getMyFoods()
  }, [])

  const handleSearchFood = async (e) => {
    e.preventDefault()
    const { search } = Object.fromEntries(new FormData(e.target))
    setSearchTerm(search)
    try {
      const { data, error } = await supabase
      .from('food')
      .select('*')
      .eq('user_id', user)
      .ilike('food_name', `%${search}%`)
      .order('food_name', { ascending: true })
      if (error) {
        console.log(error)
      } else {
        setMySearchResult(data)
        setSearching(true)
        setSearchTerm(search)
        // console.log(data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleSelectFood = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.id
    try {
      const { data, error } = await supabase
        .from('food')
        .select('*')
        .eq('user_id', user)
        .eq('id', id)
      if (error) {
        console.log(error)
      } else {
        setOpenModal(true)
        setInitialFoodData(data[0])
        setFoodData(data[0])
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleServingChange = (e) => {
    const newServing = e.target.value;
    // console.log(e.target.value)
    setFoodData({
      ...foodData,
      serving_amt: newServing
    })
  }

  useEffect(() => {
    const { serving_amt } = foodData
    const servingMultiplier = serving_amt / initialFoodData.serving_amt
    const newKcal = initialFoodData.calories * servingMultiplier
    const newProtein = initialFoodData.protein * servingMultiplier
    const newFat = initialFoodData.fat  * servingMultiplier
    const newCarbs = initialFoodData.carbs  * servingMultiplier
    setFoodData((prevFoodData) => ({
      ...prevFoodData,
      serving_amt: serving_amt,
      calories: newKcal,
      protein: newProtein,
      fat: newFat,
      carbs: newCarbs,
    }));
  },[foodData.serving_amt])

  const handleSaveFood = async (e) => {
    e.preventDefault();
  }

  const handleCreateFood = () => {
    setShowCreateFoodForm(true)
  }

  const handleCloseCreateFoodForm = () => {
    setShowCreateFoodForm(false)
  }

  const searchInputWidth = '400px'
      
  return (
    <>
    
    { showCreateFoodForm ? 
      <CreateFoodForm
      handleCancel = {handleCloseCreateFoodForm}/> : 
    (
      <Grid container direction="column" justifyContent="center" alignItems="center">
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, marginTop: 5 }}>
      <Grid item>
          <form onSubmit={handleSearchFood}>
            <SearchBar 
              searchInputWidth = {searchInputWidth}
            />
          </form>
        </Grid>
        <AddCustomItemButton 
          handleClick = {handleCreateFood}
          handleCancel = {handleCloseCreateFoodForm}
        />
      </Box>

{/* // Shows all current foods */}
    
    {myFoodData && !searching &&
    myFoodData.map(([letter, foods]) => (
      <TableContainer component={Paper} key={letter} sx={{ minWidth: 400, maxWidth: 800 }}>
        <Table size="small">
          <FoodItemTableRow
            text={letter}
          />
          <TableBody>
          {foods.map((food) => (
            <MyFoodItemCell
              key={food.id}
              id={food.id}
              food_name={food.food_name}
              serving_amt={food.serving_amt}
              serving_measure={food.serving_measure || 'g'}
              fat={food.fat}
              carbs={food.carbs}
              protein={food.protein}
              calories={food.calories}
              handleClick={handleSelectFood}
            />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ))}

{/* // Shows food search results */}
    
    {searching && mySearchResult && (
      <TableContainer component={Paper} sx={{ minWidth: 400, maxWidth: 800 }}>
        <Table size="small">
        <FoodItemTableRow
            text={searchTerm.toUpperCase()}
          />
          <TableBody>
          {mySearchResult.map((food) => (
            <MyFoodItemCell
              key={food.id}
              id={food.id}
              food_name={food.food_name}
              serving_amt={food.serving_amt}
              serving_measure={food.serving_measure || 'g'}
              fat={food.fat}
              carbs={food.carbs}
              protein={food.protein}
              calories={food.calories}
              handleClick={handleSelectFood}
            />
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

    { foodData && 
    <MyFoodServingsModal
      openModal = {openModal}
      handleCloseModal = {handleCloseModal}
      handleSaveFood ={handleSaveFood}
      foodData = {foodData}
      initialFoodData = {initialFoodData}
      handleServingChange={handleServingChange}
    /> }
  </Grid>
  )
  }
  </>
)
}

export default RecipeIngredientFoodSearcher