import { useState, useEffect } from "react";
import { LinearProgress, Stack, FormLabel, Grid, Typography, Box } from "@mui/material";
import { useGoal } from "../contexts/GoalProvider";

const FoodProgressTracker = ( { accCalories, accFat, accCarbs, accProtein }) => {
  const [caloriesProgress, setCaloriesProgress] = useState(0)
  const [fatProgress, setFatProgress] = useState(0)
  const [carbsProgress, setCarbsProgress] = useState(0)
  const [proteinProgress, setProteinProgress] = useState(0)
  const [goalValues, setGoalValues] = useState({
    calories: 0, 
    fat: 0,
    carbs: 0,
    protein: 0
  })
  const [intakeValues, setIntakeValues] = useState({
    calories: 0, 
    fat: 0,
    carbs: 0,
    protein: 0
  })

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
      setIntakeValues({
        calories: accCalories,
        fat: accFat,
        carbs: accCarbs,
        protein: accProtein,
      })
      setGoalValues({
        calories: goal["goal_calories"],
        fat: goal.fat,
        carbs: goal.carbs,
        protein: goal.protein,
      })
    }
  }, [accCalories, goal])

  const calorieColor = caloriesProgress >= 100 ? "193, 3, 11" : "0, 167, 173"
  const fatColor = fatProgress >= 100 ? "193, 3, 11" : "204, 117, 29"
  const carbsColor = carbsProgress >= 100 ?  "193, 3, 11" : "204, 29, 117"
  const proteinColor = proteinProgress >= 100 ? "193, 3, 11" : "29, 117, 204" 

  const colors = [calorieColor, fatColor, carbsColor, proteinColor]
  const labels = ["Calories", "Fat", "Carbohydrate", "Protein"]
  const intake = [intakeValues.calories, intakeValues.fat, intakeValues.carbs, intakeValues.protein]
  const goalValue = [`${goalValues.calories}kcal`, `${goalValues.fat}g`, `${goalValues.carbs}g`, `${goalValues.protein}g`]
  const values = [caloriesProgress, fatProgress, carbsProgress, proteinProgress]

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: '1rem', p: '2rem' }} >
      <Typography variant="h6" sx={{marginBottom: 2}}> Macros </Typography>
      <Stack spacing={2} sx={{ width: 180 }}>
        {labels.map((label, index) => (
        <Grid key={label}>
          <FormLabel>{label}</FormLabel>
          <LinearProgress variant="determinate" value={values[index]}
            sx={{
            backgroundColor: `rgb(${colors[index]}, 0.4)`,
            '& .MuiLinearProgress-bar': {
            backgroundColor: `rgb(${colors[index]})`},
            }}
          />
          <Typography variant="body2"> {Math.round(intake[index])} / {goalValue[index]} </Typography>
        </Grid>
        ))}
      </Stack>
    </Box>
  )
}

export default FoodProgressTracker


// https://smartdevpreneur.com/the-essential-guide-to-the-material-ui-progress-bar-color-percent-and-more/#Resources
