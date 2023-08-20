import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import {TableRow, TableCell, Modal, Typography, TextField, Button, Box, Grid, Table, TableBody, TableContainer } from '@mui/material';
import SearchBar from "../components/SearchBar";
import CreateRecipeForm from "../components/CreateRecipeForm";
import MyRecipesResultsList from "../components/MyRecipesResultsList";
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';
import AddCustomItemButton from "../components/AddCustomItemButton";
import RecipeIngredientFoodSearcher from "../components/RecipeIngredientFoodSearcher";
import RecipeIngredientSearcherPage from "./RecipeIngredientSearcherPage";
import RecipeIngredientFoodLibrarySearcher from "../components/RecipeIngredientFoodLibrarySearcher";

const MyRecipeSearcherPage = () => {
  const { user } = useAuth()
  const { meal } = useMeal()
  const { setDate, date } = useDate()
  const [myRecipeData, setMyRecipeData] = useState()
  const [myRecipeSearchResult, setMyRecipeSearchResult] = useState()
  const [searchingRecipes, setSearchingRecipes] = useState(false)
  const [showCreateRecipeForm, setShowCreateRecipeForm] = useState(false)
  const [goToRecipeIngredientSearcherPage, setGoToRecipeIngredientSearcherPage] = useState(false)
  const [myFoodData, setMyFoodData] = useState()
  const [allFoodData, setAllFoodData] = useState()
  const [myFoodSearchResult, setMyFoodSearchResult] = useState()
  const [searchingFood, setSearchingFood] = useState(false)
  const [searchFoodTerm, setSearchFoodTerm] = useState()
  const [showCreateFoodForm, setShowCreateFoodForm] = useState(false)
  const [showRecipeServingsModal, setShowRecipeServingsModal] = useState(false)
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [customRecipeName, setCustomRecipeName] = useState('');
  const [customRecipeServings, setCustomRecipeServings] = useState(1);

  const [ingredientTotals, setIngredientTotals] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  })
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

  const [initialRecipeData, setInitialRecipeData] = useState('')
  const [openSelectRecipeModal, setOpenSelectRecipeModal] = useState(false)
  const [showSelectRecipeModal, setShowSelectRecipeModal] = useState(false)
  const handleCloseModal = () => {
    setOpenSelectRecipeModal(false)
    setShowSelectRecipeModal(false)
    setShowRecipeServingsModal(false)
  }

  const [initialFoodData, setInitialFoodData] = useState('')
  const [openFoodServingsModal, setOpenFoodServingsModal] = useState(false)
  const handleCloseFoodServingsModal = () => {
    setOpenFoodServingsModal(false)
  }

  const [openRecipeShowMoreModal, setOpenRecipeShowMoreModal] = useState(false)
  const handleCloseRecipeShowMoreModal = () => {
    setOpenRecipeShowMoreModal(false)
    setRecipeShowMore(false)
  }
  const [RecipeshowMore, setRecipeShowMore] = useState(false)

  useEffect(() => {
    document.body.style.zoom = "80%";
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
        setMyRecipeSearchResult(data)
        setSearchingRecipes(true)
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
        setOpenSelectRecipeModal(true)
        setInitialRecipeData(data[0])
        setRecipeData(data[0])
        setShowSelectRecipeModal(true)
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
        setOpenRecipeShowMoreModal(true)
        setInitialRecipeData(data[0])
        setRecipeData(data[0])
        setRecipeShowMore(true)
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
        setShowSelectRecipeModal(false)
        setRecipeShowMore(false)
        navigate('/')
      }
    }
    catch (err){
      console.log(err)
    }    
  }

  const handleCreateRecipe = () => {
    setShowCreateRecipeForm(true)
  }

  const handleCloseCreateRecipeForm = () => {
    setShowCreateRecipeForm(false)
  }

  const handleGoToIngredientSearch = () => {
    setGoToRecipeIngredientSearcherPage(true)
    setShowCreateRecipeForm(false)
  }

  const handleCloseRecipeIngredientSearch = () => {
    setGoToRecipeIngredientSearcherPage(false)
    setShowCreateRecipeForm(true)
  }

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

  useEffect(() => {
    const getAllFoods = async () => {
      try {
        const { data, error } = await supabase
        .from('food')
        .select('*')
        .order('food_name', { ascending: true })
        .limit(30)
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
          setAllFoodData(Object.entries(sortedData))
          // console.log(sortedData)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getAllFoods()
  }, [])

  const handleSearchFood = async (e) => {
    e.preventDefault()
    const { search } = Object.fromEntries(new FormData(e.target))
    setSearchFoodTerm(search)
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
        setMyFoodSearchResult(data)
        setSearchingFood(true)
        setSearchFoodTerm(search)
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
        // .eq('user_id', user)
        .eq('id', id)
      if (error) {
        console.log(error)
      } else {
        setOpenFoodServingsModal(true)
        setInitialFoodData(data[0])
        setFoodData(data[0])
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleCustomRecipeNameChange = (e) => {
    setCustomRecipeName(e.target.value);
  };

  const handleCustomRecipeServingsChange = (e) => {
    setCustomRecipeServings(parseInt(e.target.value));
  };

  const handleAddCustomRecipe = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target))
    const { title, serving } = fields
    try {
      const { data, error } = await supabase
      .from('diary')
      .insert([{
        food_name: title,
        calories: ingredientTotals.calories,
        fat: ingredientTotals.fat,
        protein: ingredientTotals.protein,
        carbs: ingredientTotals.carbs,
        serving_amt: serving,
        serving_measure: "serve/s",
        [meal]: true,
        user_id: user,
        created_at: date,
       },
      ])
      if (error) {
        console.log(error)
      } 
      const { data: data2, error: error2 } = await supabase
      .from('recipes')
      .insert([
        {recipe_name: title, 
        calories: ingredientTotals.calories,
        fat: ingredientTotals.fat,
        protein: ingredientTotals.protein,
        carbs: ingredientTotals.carbs,
        servings: serving,
        ingredients: recipeIngredients,
        user_id: user,
        }
      ])
      if (error2) {
        console.log(error2)
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
        setIngredientTotals({
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        })
        setRecipeIngredients([])
        setCustomRecipeName('')
        setCustomRecipeServings(1)
      
        handleCloseModal()
        setShowSelectRecipeModal(false)
        setRecipeShowMore(false)
        navigate('/')
      }
    }
    catch (err){
      console.log(err)
    }    
  }

  const handleFoodServingChange = (e) => {
    const newServing = e.target.value;
    setFoodData({
      ...foodData,
      serving_amt: newServing
    })
  }

  useEffect(() => {
    const { serving_amt } = foodData
    console.log(serving_amt)
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

  const handleAddFood = (e) => {
    e.preventDefault()
    const updatedIngredients = [foodData, ...recipeIngredients]
    handleCloseFoodServingsModal()
    handleCloseRecipeIngredientSearch()
    setRecipeIngredients(updatedIngredients)

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

    console.log(recipeIngredients)
    console.log([foodData])
  }

  useEffect(() => {
    const calculateIngredientTotals = () => {
      const initialTotals = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      };
      const updatedTotals = recipeIngredients.reduce((acc, item) => {
        acc.calories += item.calories
        acc.fat += item.fat
        acc.carbs += item.carbs
        acc.protein += item.protein
        return acc
      }, initialTotals)
      setIngredientTotals(updatedTotals)
    }
    calculateIngredientTotals()
  }, [recipeIngredients])

  const handleDeleteRecipeIngredient = () => {

  }

  const handleCreateFood = () => {
    setShowCreateFoodForm(true)
  }

  const handleCloseCreateFoodForm = () => {
    setShowCreateFoodForm(false)
  }

  // const displayRecipeServingsModal = () => {
  //   setShowRecipeServingsModal(true)

  // }

  const [tabValue, setTabValue] = useState(0)

  const handleTabValueChange = (e, newTabValue) => {
    setTabValue(newTabValue);
  } 

  const searchInputWidth = '400px'
      
  return (
    <>
    { showCreateRecipeForm && !goToRecipeIngredientSearcherPage && (
      <CreateRecipeForm
      handleCancel = {handleCloseCreateRecipeForm}
      handleSearchIngredients = {handleGoToIngredientSearch}
      recipeIngredients={recipeIngredients}
      handleDelete={handleDeleteRecipeIngredient}
      recipeIngredientTotals={ingredientTotals}
      handleAddCustomRecipe={handleAddCustomRecipe}
      handleChangeRecipeName={handleCustomRecipeNameChange}
      handleChangeRecipeServings={handleCustomRecipeServingsChange}
      customRecipeName={customRecipeName}
      customRecipeServings={customRecipeServings}
      foodData={foodData}
      setFoodData={setFoodData}
      />
    )}
  {/* Modal to show servings to add for custom recipe  */}
    {/* { showCreateRecipeForm && showRecipeServingsModal && !showCreateRecipeForm && (
      <Modal open={showRecipeServingsModal} onClose={handleCloseModal}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
          <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
            <form onSubmit={handleSaveAndAddCustomRecipe}>
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
      )} */}

    { goToRecipeIngredientSearcherPage && (
      <RecipeIngredientSearcherPage 
      tabValue = {tabValue}
      handleTabValueChange = {handleTabValueChange}
      />
    )}

    {goToRecipeIngredientSearcherPage && tabValue === 0 && 
      <RecipeIngredientFoodSearcher 
        showCreateFoodForm = {showCreateFoodForm}
        handleCancel = {handleCloseCreateFoodForm}
        handleSearchFood ={handleSearchFood}
        searchInputWidth = {searchInputWidth}
        handleCreateFood = {handleCreateFood}
        handleCloseCreateFoodForm = {handleCloseCreateFoodForm}
        myFoodData = {myFoodData}
        searchingFood = {searchingFood}
        myFoodSearchResult = {myFoodSearchResult}
        searchFoodTerm = {searchFoodTerm}
        foodData = {foodData}
        openFoodServingsModal = {openFoodServingsModal}
        handleCloseFoodServingsModal = {handleCloseFoodServingsModal}
        handleAddFood = {handleAddFood}
        initialFoodData = {initialFoodData}
        handleFoodServingChange = {handleFoodServingChange}
        handleSelectFood = {handleSelectFood}
      />}

    {goToRecipeIngredientSearcherPage && tabValue === 1 && 
      <RecipeIngredientFoodLibrarySearcher 
        showCreateFoodForm = {showCreateFoodForm}
        handleCancel = {handleCloseCreateFoodForm}
        handleSearchFood ={handleSearchFood}
        searchInputWidth = {searchInputWidth}
        handleCreateFood = {handleCreateFood}
        handleCloseCreateFoodForm = {handleCloseCreateFoodForm}
        allFoodData = {allFoodData}
        searchingFood = {searchingFood}
        myFoodSearchResult = {myFoodSearchResult}
        searchFoodTerm = {searchFoodTerm}
        foodData = {foodData}
        openFoodServingsModal = {openFoodServingsModal}
        handleCloseFoodServingsModal = {handleCloseFoodServingsModal}
        handleAddFood = {handleAddFood}
        initialFoodData = {initialFoodData}
        handleFoodServingChange = {handleFoodServingChange}
        handleSelectFood = {handleSelectFood}
      />}
    
    { !showCreateRecipeForm && !goToRecipeIngredientSearcherPage && (
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, marginTop: 5 }}>
          <Grid item>
            <form onSubmit={handleSearchRecipes}>
              <SearchBar 
                searchInputWidth = {searchInputWidth}
              />
            </form>
          </Grid>
            <AddCustomItemButton
              handleClick = {handleCreateRecipe}
            />
          
        </Box>
  {/* // Shows all current recipes */}
      {myRecipeData && !searchingRecipes && !showCreateRecipeForm && (
        <Grid container justifyContent="flex-start" spacing={4}>
        {myRecipeData.map((recipe) => (
          <Grid item xs={3} key={recipe.id} >
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
        </Grid>
      )}
  {/* // Shows recipe search results */}
      {searchingRecipes && myRecipeSearchResult && !showCreateRecipeForm && (
      <Grid container justifyContent="flex-start" spacing={2}>
        {myRecipeSearchResult.map((recipe) => (
        <Grid item xs={3} key={recipe.id}>
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
      </Grid>
      )}

      {recipeData && showSelectRecipeModal && !showCreateRecipeForm && (
      <Modal open={openSelectRecipeModal} onClose={handleCloseModal}>
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

  {/* // Show More modal */}
      {recipeData && RecipeshowMore && !showCreateRecipeForm && (
      <Modal open={openRecipeShowMoreModal} onClose={handleCloseRecipeShowMoreModal}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
          <Grid container sx={{ maxWidth: 900, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24, maxHeight: '80vh', overflowY: 'auto' }} >
            <Grid justifyContent="center" xs={12} sx={{margin: 3}}>
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
    )}
    </>
  )
}

export default MyRecipeSearcherPage