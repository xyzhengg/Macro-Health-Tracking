import { createContext, useContext, useState } from "react";

const MealContext = createContext()

export const useMeal = () => {
  return useContext(MealContext)
}

export const MealProvider = ({ children }) => {
  const [meal, setMeal] = useState('')
  return (
    <MealContext.Provider value={{meal, setMeal}}>
      {children}
    </MealContext.Provider>
  )
}