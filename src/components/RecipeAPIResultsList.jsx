import RecipeAPIInfo from "./RecipeAPIInfo"
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";

import axios from 'axios'

const RecipeAPIResultsList = ({ id, title, image, totalCalories, fat, protein, carbs, diet, allergies, servings }) => {
  const caloriesPerServe = parseFloat(totalCalories/servings).toFixed(2)
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

  const handleShowRecipeDetails = async (e) => {
    const id = e.currentTarget.id


    
    console.log(id)
    try {
      const res = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`)
      console.log(res.data)
      setSelectedRecipe(res.data)
      navigate(`/apirecipe/${id}`, {
          id,
          title,
          image,
          calories: caloriesPerServe,
          servings,
          fat,
          protein,
          carbs,
          allergies: filteredAllergies,
          diets: filteredDiets,
          ingredients: res.data.recipe.ingredients,
          linkToDirections: res.data.recipe.url,
        }
      )
    } catch(err) {
      console.log(err)
      setError(err)
    }
      
  }

  return (
    <>
    <div id={id} onClick={handleShowRecipeDetails}>
      <h4> {title} </h4>
      <img src={image} alt={`image of ${title}`}/>
      <p> Calories/serve: {caloriesPerServe}kcal </p>
      <p> Servings: {servings}</p>
      <p> F: {fat}g </p>
      <p> P: {protein}g </p>
      <p> C: {carbs}g </p> 
      {filteredDiets && (
        <>
          <h4> Diet Considerations </h4>
          {filteredDiets.map((diet) => (<p key={diet}> {diet} </p>))}
        </>
      )}
      
      {filteredAllergies && (
        <>
          <h4> Allergy Considerations </h4>
          {filteredAllergies.map((allergen) => (<p key={allergen}> {allergen} </p>))}
        </>
      )}
      <button> + Add </button>
    </div>
    {/* {selectedRecipe && 
      <RecipeAPIInfo
        id = {id}
        title={title}
        image = {image}
        calories = {caloriesPerServe}
        servings = {servings}
        fat = {fat}
        protein = {protein}
        carbs = {carbs}
        allergies = {filteredAllergies}
        diets = {filteredDiets}
        ingredients = {selectedRecipe.recipe.ingredients}
        linkToDirections = {selectedRecipe.recipe.url}
      />} */}
    </>
  )
}

export default RecipeAPIResultsList