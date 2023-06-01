import { useState, useEffect } from 'react'
import axios from 'axios'
import FoodResultsDisplay from './FoodResultsDisplay'


const FoodSearcher = () => {
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [filteredResults, setFilteredResults] = useState(null)

  const handleSearchFood = async (e) => {
    e.preventDefault()
    const { search } = Object.fromEntries(new FormData(e.target))

    try {
      const res = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=c3a053e6&app_key=a5494242fbb8e5d5184b54cad1d5e4b6&ingr=${search}&nutrition-type=cooking`)
      console.log(res.data.hints)
      setResults(res.data.hints)
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
    }
  }, [results])

  
  
  return (
    <>
      <form onSubmit={handleSearchFood}>
        <input type="text" name="search" placeholder="search" />
        {error && <div> Error: {error} </div>}
        <button type="submit"> Search </button>
      </form>
      {filteredResults && filteredResults.map((result) => (
        <FoodResultsDisplay
        key = {result.food.foodId}
        label = {result.food.label}
        kcal = {result.food.nutrients["ENERC_KCAL"]}
        fat = {result.food.nutrients.FAT}
        protein = {result.food.nutrients.PROCNT}
        carbs = {result.food.nutrients.CHOCDF}
        />
      ))}
    </>
  )
}

export default FoodSearcher

// search box
// search button
// results area
    // should be clickable/selectable to save
