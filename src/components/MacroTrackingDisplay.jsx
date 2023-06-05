import { createContext, useState, useContext } from 'react'
import BreakfastTable from "./BreakfastTable"
import LunchTable from "./LunchTable"
import DinnerTable from "./DinnerTable"
import SnackTable from "./SnackTable"

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
  );
};

const MacroTrackingDisplay = () => {
  const {meal, setMeal} = useMeal()
  return (
    <>
      <BreakfastTable setMeal={setMeal} meal={meal}/>
      <br/>
      <LunchTable setMeal={setMeal} meal={meal}/>
      <br/>
      <DinnerTable setMeal={setMeal} meal={meal}/>
      <br/>
      <SnackTable setMeal={setMeal} meal={meal}/>
      <br/>
    </>
  )
}

export default MacroTrackingDisplay