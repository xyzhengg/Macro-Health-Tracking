import { useState, useEffect } from "react";
import { LinearProgress, Stack, FormLabel, Grid } from "@mui/material";
import { useGoal } from "../contexts/GoalProvider";

const FoodProgressTracker = ( { accCalories, accFat, accCarbs, accProtein }) => {
  const [caloriesProgress, setCaloriesProgress] = useState(0)
  const [fatProgress, setFatProgress] = useState(0)
  const [carbsProgress, setCarbsProgress] = useState(0)
  const [proteinProgress, setProteinProgress] = useState(0)
  const { goal } = useGoal()

  useEffect(() => {
    if (goal) {
      const calorieAmount = (accCalories / goal["goal_calories"]) * 100
      const fatAmount = (accFat / goal.fat) * 100
      const carbsAmount = (accCarbs / goal.carbs) * 100
      const proteinAmount = (accProtein / goal.protein) * 100
      setCaloriesProgress(calorieAmount >= 100 ? 100 : calorieAmount)
      setFatProgress(fatAmount >= 100 ? 100 : fatAmount)
      setCarbsProgress(carbsAmount >= 100 ? 100 : carbsAmount)
      setProteinProgress(proteinAmount >= 100 ? 100 : proteinAmount)
    }
  }, [accCalories, goal])

  const calorieColor = caloriesProgress >= 100 ? "193, 3, 11" : "0, 167, 173"
  const fatColor = fatProgress >= 100 ? "193, 3, 11" : "204, 117, 29"
  const carbsColor = carbsProgress >= 100 ?  "193, 3, 11" : "204, 29, 117"
  const proteinColor = proteinProgress >= 100 ? "193, 3, 11" : "29, 117, 204" 

  const colors = [calorieColor, fatColor, carbsColor, proteinColor]
  const labels = ["Calories", "Fat", "Carbohydrate", "Protein"]
  const values = [caloriesProgress, fatProgress, carbsProgress, proteinProgress]

  return (
    <Stack spacing={3} sx={{width:300}}>
    {labels.map((label, index) => (
      <Grid key={index}>
        <FormLabel>{label}</FormLabel>
        <LinearProgress
          variant="determinate"
          sx={{
            backgroundColor: `rgb(${colors[index]}, 0.4)`,
            "& .MuiLinearProgress-bar": {
              backgroundColor: `rgb(${colors[index]})`
            }
          }}
          value={values[index]}
        />
      </Grid>
    ))}
  </Stack>
  )
}

export default FoodProgressTracker


// https://smartdevpreneur.com/the-essential-guide-to-the-material-ui-progress-bar-color-percent-and-more/#Resources
