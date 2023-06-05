import BreakfastTable from "./BreakfastTable"
import LunchTable from "./LunchTable"
import DinnerTable from "./DinnerTable"
import SnackTable from "./SnackTable"
import { useState } from "react"

const MacroTrackingDisplay = () => {
  const [meal, setMeal] = useState()
  return (
    <>
      <BreakfastTable
      setMeal = {setMeal}
      meal = {meal}/>
      <br/>
      <LunchTable
      setMeal = {setMeal}
      meal = {meal}/>
      <br/>
      <DinnerTable
      setMeal = {setMeal}
      meal = {meal}/>
      <br/>
      <SnackTable
      setMeal = {setMeal}
      meal = {meal}/>
      <br/>
    </>
  )
}

export default MacroTrackingDisplay