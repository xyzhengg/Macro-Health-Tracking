import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeResultsDisplay from '../components/RecipeResultsDisplay'

const RecipeSearcherPage = () => {
  const [results, setResults] = useState(null)
  const [nextLink, setNextLink] = useState(null)
  const [error, setError] = useState(null)

  const handleSearchRecipes = async (e) => {
    e.preventDefault()
    const { keywords, calories, diet, allergies } = Object.fromEntries(new FormData(e.target))
    console.log(keywords, calories, diet, allergies)

    const url = `https://api.edamam.com/api/recipes/v2?type=public` 
      + (keywords ? `&q=${keywords}` : '')
      + `&app_id=1630a2de&app_key=8c2f7e5b603050e3bc5815d4675ac28e`
      + (calories ? `&calories=0-${calories}` : '')
      + (diet ? `&diet=${diet}` : '')
      + (allergies ? `&health=${allergies}` : '')

    console.log(url)

    try {
      const res = await axios.get(url)
      console.log(res.data.hits)
      console.log(res.data._links.next)
      setResults(res.data.hits)
      setNextLink(res.data._links.next.href)
    } catch(err) {
      console.log(err)
      setError(err)
    }
  }

  useEffect(() => {
    if (results) {
      }
      setResults(results)
  }, [results])

  return (
    <>
      <form onSubmit={handleSearchRecipes}>
        <div>
          <label htmlFor="keyword"> Keywords:</label>
          <input type="text" name="keywords" placeholder="Search by Keywords"/>
        </div>

        <div>
          <label htmlFor="calories"> Maximum Calories per Serve:</label>
          <input type="number" name="calories"/><p>kcal</p>          
        </div>

        <div>
          <h3> Diets </h3>
          <input type="checkbox" id="low-carb" name="diet" value="low-carb"/>
          <label htmlFor="low-carb"> Low Carb</label>

          <input type="checkbox" id="low-fat" name="diet" value="low-fat"/>
          <label htmlFor="low-fat"> Low Fat</label>

          <input type="checkbox" id="high-protein" name="diet" value="high-protein"/>
          <label htmlFor="high-protein"> High Protein</label>

          <input type="checkbox" id="balanced" name="diet" value="balanced"/>
          <label htmlFor="balanced"> Balanced</label>

          <input type="checkbox" id="high-fiber" name="diet" value="high-fiber"/>
          <label htmlFor="high-fiber"> High Fiber</label>

          <input type="checkbox" id="low-sodium" name="diet" value="low-sodium"/>
          <label htmlFor="low-sodium"> Low Sodium</label>

          <input type="checkbox" id="paleo" name="diet" value="paleo"/>
          <label htmlFor="paleo"> Paleo </label>

          <input type="checkbox" id="pescatarian" name="diet" value="pescatarian"/>
          <label htmlFor="pescatarian"> Pescatarian</label>

          <input type="checkbox" id="vegan" name="diet" value="vegan"/>
          <label htmlFor="vegan"> Vegan </label>

          <input type="checkbox" id="vegetarian" name="diet" value="vegetarian"/>
          <label htmlFor="vegetarian"> Vegetarian</label>

          <input type="checkbox" id="pork-free" name="diet" value="pork-free"/>
          <label htmlFor="pork-free"> Pork Free</label>
        </div>

        <div>
        <h3> Allergies </h3>
          <input type="checkbox" id="dairy-free" name="allergies" value="dairy-free"/>
          <label htmlFor="dairy-free"> Dairy Free</label>

          <input type="checkbox" id="egg-free" name="allergies" value="egg-free"/>
          <label htmlFor="egg-free"> Egg Free</label>

          <input type="checkbox" id="gluten-free" name="allergies" value="gluten-free"/>
          <label htmlFor="gluten-free"> Gluten Free</label>

          <input type="checkbox" id="peanut-free" name="allergies" value="peanut-free"/>
          <label htmlFor="peanut-free"> Peanut Free </label>

          <input type="checkbox" id="shellfish-free" name="allergies" value="shellfish-free"/>
          <label htmlFor="shellfish-free"> Shellfish Free </label>

          <input type="checkbox" id="crustacean-free" name="allergies" value="crustacean-free"/>
          <label htmlFor="crustacean-free"> Crustacean Free</label>

          <input type="checkbox" id="soy-free" name="allergies" value="soy-free"/>
          <label htmlFor="soy-free"> Soy Free </label>

          <input type="checkbox" id="sesame-free" name="allergies" value="sesame-free"/>
          <label htmlFor="sesame-free"> Sesame Free</label>

          <input type="checkbox" id="wheat-free" name="allergies" value="wheat-free"/>
          <label htmlFor="wheat-free"> Wheat Free</label>

          <input type="checkbox" id="fish-free" name="allergies" value="fish-free"/>
          <label htmlFor="fish-free"> Fish Free </label>

          <input type="checkbox" id="lupine-free" name="allergies" value="lupine-free"/>
          <label htmlFor="lupine-free"> Lupine Free </label>

          <input type="checkbox" id="tree-nut-free" name="allergies" value="tree-nut-free"/>
          <label htmlFor="tree-nut-free"> Tree Nut Free</label>

          <input type="checkbox" id="celery-free " name="allergies" value="celery-free"/>
          <label htmlFor="celery-free"> Celery Free </label>

          <input type="checkbox" id="mustard-free" name="allergies" value="mustard-free"/>
          <label htmlFor="mustard-free"> Mustard Free</label>
        </div>
        <input type="submit"/>
        <input type="reset"/>
      </form>



      {results && results.map((result ) => (
  
      <RecipeResultsDisplay
        key = {result.recipe.uri}
        title = {result.recipe.label}
        image = {result.recipe.image}
        totalCalories = {parseFloat((result.recipe.calories), 2)}
        fat = {parseFloat(result.recipe.totalNutrients.FAT.quantity).toFixed(2)}
        protein = {parseFloat(result.recipe.totalNutrients.PROCNT.quantity).toFixed(2)}
        carbs = {parseFloat(result.recipe.totalNutrients.CHOCDF.quantity).toFixed(2)}
        diet = {result.recipe.dietLabels}
        allergies = {result.recipe.healthLabels}
        servings = {result.recipe.yield}
      />
      ))}
      {nextLink && <a href={nextLink}> Next Page </a>}
    </>
  )
}

export default RecipeSearcherPage