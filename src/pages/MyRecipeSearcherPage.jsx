import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import {TableRow, TableCell, Modal, Typography, TextField, InputBase, Button, Box, Grid, Table, TableBody, TableContainer } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MyRecipesResultsList from "../components/MyRecipesResultsList";
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';

const MyRecipeSearcherPage = () => {
  const { user } = useAuth()
  const { meal } = useMeal()
  const { setDate, date } = useDate()
  const [myRecipeData, setMyRecipeData] = useState()
  const [mySearchResult, setMySearchResult] = useState()
  const [searching, setSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState()
  const navigate = useNavigate()

  const [recipeData, setRecipeData] = useState({
    recipe_name: "",
    servings: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
    meal: "",
    image: "",
    ingredients: ""
  })

  const [initialRecipeData, setInitialRecipeData] = useState('')

  const [openModal, setOpenModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => {
    setOpenModal(false)
    setShowModal(false)
  }

  const [openShowMoreModal, setOpenShowMoreModal] = useState(false)
  const handleCloseShowMoreModal = () => {
    setOpenShowMoreModal(false)
    setShowMore(false)
  }
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    document.body.style.zoom = "78%";
  }, [])

  useEffect(() => {
    const getMyRecipes = async () => {
      try {
        const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user)
        .order('recipe_name', { ascending: true })
        if (error) {
          console.log(error)
        } else {
          setMyRecipeData(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getMyRecipes()
  }, [])

  const handleSearchRecipes = async (e) => {
    e.preventDefault()
    const { search } = Object.fromEntries(new FormData(e.target))
    setSearchTerm(search)
    try {
      const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', user)
      .ilike('recipe_name', `%${search}%`)
      .order('recipe_name', { ascending: true })
      if (error) {
        console.log(error)
      } else {
        setMySearchResult(data)
        setSearching(true)
        setSearchTerm(search)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleSelectRecipe = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.id
    console.log(id)
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user)
        .eq('id', id)
      if (error) {
        console.log(error)
      } else {
        setOpenModal(true)
        setInitialRecipeData(data[0])
        setRecipeData(data[0])
        setShowModal(true)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleShowRecipeDetails = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.id
    try {
      const { data, error} = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user)
        .eq('id', id)
      if (error) {
        console.log(error)
      } else {
        setOpenShowMoreModal(true)
        setInitialRecipeData(data[0])
        setRecipeData(data[0])
        setShowMore(true)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleServingChange = (e) => {
    const newServing = e.target.value;
    setRecipeData({
      ...recipeData,
      servings: newServing
    })
  }

  useEffect(() => {
    const { servings } = recipeData
    const servingMultiplier = servings / initialRecipeData.servings
    const newKcal = initialRecipeData.calories * servingMultiplier
    const newProtein = initialRecipeData.protein * servingMultiplier
    const newFat = initialRecipeData.fat  * servingMultiplier
    const newCarbs = initialRecipeData.carbs  * servingMultiplier
    setRecipeData((prevRecipeData) => ({
      ...prevRecipeData,
      servings: servings,
      calories: newKcal,
      protein: newProtein,
      fat: newFat,
      carbs: newCarbs,
    }));
  },[recipeData.servings])

  const handleSaveRecipe = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
      .from('diary')
      .insert([{
        food_name: recipeData.recipe_name,
        calories: recipeData.calories,
        fat: recipeData.fat,
        protein: recipeData.protein,
        carbs: recipeData.carbs,
        serving_amt: recipeData.servings,
        serving_measure: "serve/s",
        [meal]: true,
        user_id: user,
        created_at: date,
       },
      ])
      if (error) {
        console.log(error)
      } else {
        setDate(new Date(date.getTime() + 10000))
        setInitialRecipeData("")
        setRecipeData({
          recipe_name: "",
          servings: "",
          calories: "",
          protein: "",
          fat: "",
          carbs: "",
          meal: "",
          image: "",
          ingredients: ""
        })
        handleCloseModal()
        setShowModal(false)
        setShowMore(false)
        navigate('/')
      }
    }
    catch (err){
      console.log(err)
    }    
  }

  const handleCreateRecipe = () => {
    navigate('/create/recipe')
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
          <form onSubmit={handleSearchRecipes}>
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
          <Button onClick={handleCreateRecipe} sx={{
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
{/* // Shows all current recipes */}
    {myRecipeData && !searching && (
      <Box justifyContent="space-around">
        {myRecipeData.map((recipe) => (
        <Grid item justifyContent="flex-start" xs={8} key={recipe.id}>
          <MyRecipesResultsList
            key={recipe.id}
            id={recipe.id}
            title={recipe.recipe_name}
            image={recipe.image}
            calories={Math.round(recipe.calories)}
            fat={Math.round(recipe.fat)}
            protein={Math.round(recipe.protein)}
            carbs={Math.round(recipe.carbs)}
            servings={Math.round(recipe.servings)}
            ingredients={JSON.parse(recipe.ingredients)}
            handleClick={handleSelectRecipe}
            handleShowRecipeDetails={handleShowRecipeDetails}
          />
        </Grid>
        ))}
      </Box>
    )}
{/* // Shows recipe search results */}
    {searching && mySearchResult && (
    <Box xs={12} justifyContent="space-around">
      {mySearchResult.map((recipe) => (
      <Grid item justifyContent="flex-start" xs={2} key={recipe.id}>
        <MyRecipesResultsList
          key={recipe.id}
          id={recipe.id}
          title={recipe.recipe_name}
          image={recipe.image}
          calories={Math.round(recipe.calories)}
          fat={Math.round(recipe.fat)}
          protein={Math.round(recipe.protein)}
          carbs={Math.round(recipe.carbs)}
          servings={Math.round(recipe.servings)}
          ingredients={JSON.parse(recipe.ingredients)}
          handleClick={handleSelectRecipe}
          handleShowRecipeDetails={handleShowRecipeDetails}
        />
      </Grid>
      ))}
    </Box>
    )}

    {recipeData && showModal && (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
        <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
          <form onSubmit={handleSaveRecipe}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">{recipeData.recipe_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleServingChange}
                  label={`Servings`}
                  name="servings"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  defaultValue={1}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{ height: 40 }}
                />
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop: 5}}>
                <Typography>Calories: {Math.round(recipeData.calories)}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>F: {Math.round(recipeData.fat)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>C: {Math.round(recipeData.carbs)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>P: {Math.round(recipeData.protein)}g</Typography>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 5 }}>
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </Modal>
    )}

    {searching && mySearchResult && (
    <Box xs={12} justifyContent="space-around">
      {mySearchResult.map((recipe) => (
      <Grid item justifyContent="flex-start" xs={2} key={recipe.id}>
        <MyRecipesResultsList
          key={recipe.id}
          id={recipe.id}
          title={recipe.recipe_name}
          image={recipe.image}
          calories={Math.round(recipe.calories)}
          fat={Math.round(recipe.fat)}
          protein={Math.round(recipe.protein)}
          carbs={Math.round(recipe.carbs)}
          servings={1}
          ingredients={JSON.parse(recipe.ingredients)}
          handleClick={handleSelectRecipe}
          handleShowRecipeDetails={handleShowRecipeDetails}
        />
      </Grid>
      ))}
    </Box>
    )}

{/* // Show More modal */}
    {recipeData && showMore && (
    <Modal open={openShowMoreModal} onClose={handleCloseShowMoreModal}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
        <Grid container sx={{ maxWidth: 900, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24, maxHeight: '80vh', overflowY: 'auto' }} >
          <Grid container justifyContent="center" xs={12} sx={{margin: 3}}>
            <Typography variant="h4">{recipeData.recipe_name}</Typography>
          </Grid>
          <Grid container direction="row" justifyContent="space-around" xs={12}>
            <Grid item xs={6}>
              <Typography variant="h6">Ingredients:</Typography>
              <TableContainer >
                <Table>
                  <TableBody>
                  {recipeData && JSON.parse(recipeData.ingredients).map((ingredient) => (
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
            <Grid item xs={4}>
              <form onSubmit={handleSaveRecipe}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleServingChange}
                  label={`Servings`}
                  name="servings"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  step="0.01"
                  min="0"
                  defaultValue={recipeData.servings}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{ height: 40 }}
                />
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop: 5}}>
                <Typography>Calories: {Math.round(recipeData.calories)}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>F: {Math.round(recipeData.fat)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>C: {Math.round(recipeData.carbs)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>P: {Math.round(recipeData.protein)}g</Typography>
              </Grid>
              <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 5 }}>
                Save
              </Button>
              </form>
            </Grid>
          </Grid>  
        </Grid>
      </Grid>
    </Modal>
    )}
  </Grid>
  )
}

export default MyRecipeSearcherPage