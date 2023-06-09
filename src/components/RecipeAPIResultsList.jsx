import { useState } from 'react'
import { useAuth } from '../contexts/AuthProvider';
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';
import { useNavigate } from "react-router-dom";
import {Typography, Button, CardContent, Box} from '@mui/material';
import axios from 'axios'
import { supabase } from "../supabaseAuth/supabaseClient"

const RecipeAPIResultsList = ({ id, title, image, totalCalories, fat, protein, carbs, diet, allergies, servings }) => {
  const caloriesPerServe = (Math.round(totalCalories/servings))
  const allergyConsiderations =[
    "dairy-free",
    "egg-free",
    "gluten-free",
    "peanut-free",
    "shellfish-free",
    "crustacean-free",
    "soy-free",
    "sesame-free",
    "wheat-free",
    "fish-free",
    "lupine-free",
    "tree-nut-free",
    "celery-free",
    "mustard-free"
  ]

  const dietConsiderations = [
    "low-carb",
    "low-fat",
    "high-protein",
    "balanced",
    "high-fiber",
    "low-sodium",
    "paleo",
    "pescatarian",
    "vegan",
    "vegetarian",
    "pork-free"
  ]

  const filteredAllergies = allergies.filter((allergen) => allergyConsiderations.includes(allergen.toLowerCase()))
  const filteredDiets = diet.filter((dietItem) => dietConsiderations.includes(dietItem.toLowerCase()))

  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { meal } = useMeal()
  const { user } = useAuth()
  const { date } = useDate()

  const handleShowRecipeDetails = async (e) => {
    const id = e.currentTarget.id
    console.log(id)
    try {
      const res = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`)
      console.log(res.data.recipe.ingredients)
      setSelectedRecipe(res.data)
      const recipe = {
        id: id,
        title: title,
        image: image,
        calories: caloriesPerServe,
        servings: servings,
        fat: Math.round(fat/servings),
        protein: Math.round(protein/servings),
        carbs: Math.round(carbs/servings),
        allergies: filteredAllergies,
        diets: filteredDiets,
        ingredients: JSON.parse(res.data.recipe.ingredients),
        linkToDirections: res.data.recipe.url,
      }
      navigate(`/api/recipe/${id}`, { state: recipe})
      console.log(typeof ingredients)
    } catch(err) {
      console.log(err)
      setError(err)
    }
  }

  const handleAddAPIRecipe = async (e) => {
    const id = e.currentTarget.id
    try {
      const res = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`);
      const { data, error } = await supabase
        .from('recipes')
        .insert([
          {
            user_id: user,
            calories: caloriesPerServe,
            fat: Math.round(fat/servings),
            protein: Math.round(protein/servings),
            carbs: Math.round(carbs/servings),
            recipe_name: title,
            servings: 1,
            ingredients: res.data.recipe.ingredients,
            image: image
          }
        ])
        if (error) {
          console.log(error)
        }
      const {data: data2, error: error2} = await supabase
        .from('diary')
        .insert([
          {
            food_name: title,
            calories: caloriesPerServe,
            fat: Math.round(fat/servings),
            protein: Math.round(protein/servings),
            carbs: Math.round(carbs/servings),
            serving_amt: 1,
            serving_measure: "serve/s",
            [meal]: true,
            user_id: user,
            created_at: date
          }
        ])
      if (error2) {
        console.log(error2)
      }
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(err)
    }
  }

  return (
    <>
      <CardContent  sx={{ marginTop: 2, paddingBottom: 0, border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: 300}}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {title} </Typography>
          <Box sx={{ width: '100%', height: 0, paddingTop: '100%', position: 'relative', overflow: 'hidden'}}>
            <img src={image} alt={`image of ${title}`} 
              style={{position: 'absolute', top: 0,left: 0, width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </Box>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Calories/serve: {caloriesPerServe}kcal </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Servings: {servings} </Typography>
          <Typography variant="body2">F: {Math.round(fat/servings)}g </Typography>
          <Typography variant="body2">C: {Math.round(carbs/servings)}g </Typography>
          <Typography variant="body2">P: {Math.round(protein/servings)}g </Typography>
        </Box>
        <Box>
          <Button id={id} size="small" fullWidth onClick={handleShowRecipeDetails}
            sx={{ padding:'0px', marginTop: "20px",
            backgroundColor: `rgb(175, 194, 214)`, 
            color: `rgb(255,255,255)`, 
            '&:hover': {
            backgroundColor: `rgb(175, 194, 214)`, 
            color: `rgb(255,255,255)`}}}
            > Show More
          </Button>
          <Button id={id} size="small" fullWidth onClick={handleAddAPIRecipe}
            sx={{ padding:'0px', marginTop: "10px",
            backgroundColor: `rgb(154, 198, 199)`, 
            color: `rgb(255,255,255)`, 
            '&:hover': {
            backgroundColor: `rgb(154, 198, 199)`, 
            color: `rgb(255,255,255)`}}}
            > Add
          </Button>
        </Box>
      </CardContent>
    </>
  )
}

export default RecipeAPIResultsList