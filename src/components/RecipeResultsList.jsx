import RecipeInfo from "./RecipeInfo"
import { useState, useEffect } from 'react'
import axios from 'axios'

const RecipeResultsList = ({ id, title, image, totalCalories, fat, protein, carbs, diet, allergies, servings }) => {
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

  const [results, setResults] = useState(null)
  const handleShowRecipeDetails = async (e) => {
    const id = e.target.id
    try {
      const res = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`)
      console.log(res.data)
      setResults(res.data)
    } catch(err) {
      console.log(err)
      setError(err)
    }

    return (
      <RecipeInfo
        id = {id}
        title={title}
        image = {image}
        servings = {servings}
        fat = {fat}
        protein = {protein}
        carbs = {carbs}
        allergies = {filteredAllergies}
        diets = {filteredDiets}
      />
    )
  }


  return (
    <div id={id} onClick={handleShowRecipeDetails}>
      <h4> {title} </h4>
      <img src={image} alt={`image of ${title}`}/>
      <p> Calories/serve: {caloriesPerServe}kcal </p>
      <p> Servings: {servings}</p>
      <p> F: {fat} </p>
      <p> P: {protein} </p>
      <p> C: {carbs} </p> 
      { filteredDiets && (
        <>
          <h4> Diet Considerations </h4>
          {filteredDiets.map((diet) => (<p key={diet}> {diet} </p>))}
        </>
      )}
      
      { filteredAllergies && (
        <>
          <h4> Allergy Considerations </h4>
          {filteredAllergies.map((allergen) => (<p key={allergen}> {allergen} </p>))}
        </>
      )}
      <button> + Add </button>
    </div>
  )
}

export default RecipeResultsList