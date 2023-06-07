import BreakfastTable from "./BreakfastTable"
import LunchTable from "./LunchTable"
import DinnerTable from "./DinnerTable"
import SnackTable from "./SnackTable"
import { useMeal } from '../contexts/MealContext'


const MacroTrackingDisplay = ( {breakfastData, breakfastTotals, lunchData, lunchTotals, dinnerData, dinnerTotals, snackData, snackTotals }) => {
  const { meal, setMeal } = useMeal()
  return (
    <>
      <BreakfastTable setMeal={setMeal} meal={meal} breakfastData={breakfastData} breakfastTotals={breakfastTotals}/>
      <br/>
      <LunchTable setMeal={setMeal} meal={meal} lunchData = {lunchData} lunchTotals = {lunchTotals}/>
      <br/>
      <DinnerTable setMeal={setMeal} meal={meal} dinnerData = {dinnerData} dinnerTotals = {dinnerTotals}/>
      <br/>
      <SnackTable setMeal={setMeal} meal={meal} snackData = {snackData} snackTotals = {snackTotals}/>
      <br/>
    </>
  )
}

export default MacroTrackingDisplay