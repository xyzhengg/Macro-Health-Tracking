import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import {Modal, Typography, TextField, InputBase, Button, Box, Grid, Table, TableBody, TableContainer, Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MyFoodItemCell from "../components/MyFoodItemCell";
import FoodItemTableRow from "../components/FoodItemTableRow";
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';

const MyFoodSearcherPage = () => {
  const { user } = useAuth()
  const { meal } = useMeal()
  const { setDate, date } = useDate()
  const [myFoodData, setMyFoodData] = useState()
  const [mySearchResult, setMySearchResult] = useState()
  const [searching, setSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState()
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

  const handleAddFood = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.id
    console.log(id)
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

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
      .from('diary')
      .insert([{
        food_name: foodData.food_name,
        calories: foodData.calories,
        fat: foodData.fat,
        protein: foodData.protein,
        carbs: foodData.carbs,
        serving_amt: foodData.serving_amt,
        serving_measure: foodData.serving_measure || "g",
        [meal]: true,
        user_id: user,
        created_at: date,
       },
      ])
      if (error) {
        console.log(error)
      } else {
        // console.log(data)
        setDate(new Date(date.getTime() + 10000))
        setInitialFoodData("")
        setFoodData({
          food_name: "",
          serving_amt: "",
          serving_measure: "",
          calories: "",
          protein: "",
          fat: "",
          carbs: ""
        })
        handleCloseModal()
        navigate('/')
      }
    }
    catch (err){
      console.log(err)
    }    
  }

  const handleCreateFood = () => {
    navigate('/createfood')
  }

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
  }}))
      
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, marginTop: 5 }}>
        <Grid item>
          <form onSubmit={handleSearchFood}>
            <Search sx={{ width: '600px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" name="search" sx={{ border: '1px solid #e0e0e0', width: '400px' }} />
            <Button
              type="submit" sx={{
              height: "40px",
              backgroundColor: `rgb(196, 155, 178)`,
              color: `rgb(255,255,255)`,
              '&:hover': {
              backgroundColor: `rgb(196, 155, 178)`,
              color: `rgb(255,255,255)`,
              transform: 'scale(1.05)'
              }}}>
              Search
            </Button>
          </Search>
        </form>
        </Grid>
        <Grid item sx={{marginLeft: 20}}>
          <Button onClick={handleCreateFood} sx={{
              height: "40px",
              backgroundColor: `rgb(175, 194, 214)`,
              color: `rgb(255,255,255)`,
              '&:hover': {
              backgroundColor: `rgb(175, 194, 214)`,
              color: `rgb(255,255,255)`,
              transform: 'scale(1.05)',
              }}}>
              + Add
            </Button>
        </Grid>
      </Box>
    
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
              handleClick={handleAddFood}
            />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ))}
    
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
              handleClick={handleAddFood}
            />
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

{ foodData && (
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
          <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
            <form onSubmit={handleSaveEdit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">{foodData.food_name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleServingChange}
                    label={`Serving size ${initialFoodData.serving_measure || 'g'}`}
                    name="serving_amt"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    defaultValue={foodData.serving_amt}
                    InputLabelProps={{ shrink: true }}
                    required
                    fullWidth
                    sx={{ height: 40 }}
                  />
                  <Typography></Typography>
                  </Grid>
                  <Grid item xs={12} sx={{marginTop: 5}}>
                    <Typography>Calories: {Math.round(foodData.calories)}kcal</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>F: {Math.round(foodData.fat)}g</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>C: {Math.round(foodData.carbs)}g</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>P: {Math.round(foodData.protein)}g</Typography>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 5 }}>
                  Save
                </Button>
              </form>
            </Grid>
        </Grid>
      </Modal>
      )
      }
  </Grid>
  )
}

export default MyFoodSearcherPage

// https://www.educative.io/answers/how-to-get-keys-values-and-entries-in-javascript-object