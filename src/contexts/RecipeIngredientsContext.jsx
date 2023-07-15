import { createContext, useContext, useState } from "react";

const RecipeIngredientsContext = createContext()

export const useRecipeIngredients = () => {
  return useContext(RecipeIngredientsContext)
}

export const RecipeIngredientsProvider = ({ children }) => {
  const [recipeIngredients, setRecipeIngredients] = useState('')
  return (
    <RecipeIngredientsContext.Provider value={{recipeIngredients, setRecipeIngredients}}>
      {children}
    </RecipeIngredientsContext.Provider>
  )
}