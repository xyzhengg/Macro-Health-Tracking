import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthProvider';
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import {Typography, Button, CardContent, Box} from '@mui/material';
import { AspectRatio } from "@mui/icons-material";
import axios from 'axios'
import { supabase } from "../supabaseAuth/supabaseClient"


const MyRecipesResultsList = ({ id, title, image, calories, fat, protein, carbs, servings, ingredients, handleClick }) => {
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
      console.log(res.data)
      setSelectedRecipe(res.data)
      const recipe = {
        id: id,
        title: title,
        image: image,
        calories: Math.round(totalCalories/servings),
        servings: servings,
        fat: Math.round(fat/servings),
        protein: Math.round(protein/servings),
        carbs: Math.round(carbs/servings),
        allergies: filteredAllergies,
        diets: filteredDiets,
        ingredients: res.data.recipe.ingredients,
        linkToDirections: res.data.recipe.url,
      }
      navigate(`/api/recipe/${id}`, { state: recipe})
    } catch(err) {
      console.log(err)
      setError(err)
    }
  }

  const handleAddAPIRecipe = async (e) => {
    const id = e.currentTarget.id
  
    try {
      const res = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`);
      console.log(res.data)
      const rawIngredientData = res.data.recipe.ingredients
      const restructuredIngredients = rawIngredientData.map((ingredient) => ({
        food: ingredient.food,
        quantity: ingredient.quantity,
        measure: ingredient.measure,
        weight: Math.round(ingredient.weight)
      }))
  
      const {data: data2, error: error2} = await supabase
        .from('diary')
        .insert([
          {
            food_name: title,
            calories: caloriesPerServe,
            fat: Math.round(fat/servings),
            protein: Math.round(protein/servings),
            carbs: Math.round(carbs/servings),
            serving_amt: servings,
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
      <CardContent  sx={{ marginTop: 2, paddingBottom: 0, border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: 400}}>
        <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {title} </Typography>
        <Box minHeight="120px" maxHeight="200px" display="flex" alignItems="center" justifyContent="center">
          <img src={image} loading="lazy" alt={`image of ${title}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Calories/serve: {calories}kcal </Typography>
        <Typography variant="body2">F: {fat}g </Typography>
        <Typography variant="body2">C: {carbs}g </Typography>
        <Typography variant="body2">P: {protein}g </Typography>
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
      </CardContent>
    </>
  )
}

export default MyRecipesResultsList