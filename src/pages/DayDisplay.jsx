import MacroTrackingDisplay from "../components/MacroTrackingDisplay"
import { supabase } from '../supabaseAuth/supabaseClient';
import { Box, Grid } from '@mui/material'
import DateNavigation from "../components/DateNavigation"
import CalorieProgress from "../components/CalorieProgress"
import { useEffect, useState } from 'react';
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';
import { useAuth } from '../contexts/AuthProvider';

const DayDisplay = () => {
  const { setMeal } = useMeal()
  const { date, setDate } = useDate()
  const { user } = useAuth()
  const [breakfastData, setBreakfastData] = useState([])
  const [breakfastTotals, setBreakfastTotals] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  })

  useEffect(() => {
    const getBreakfastData = async () => {
      try {
        const { data, error } = await supabase
          .from('diary')
          .select('*')
          .eq('breakfast', true)
          .eq('user_id', user)
          .gte('created_at', `${date.toISOString().split('T')[0]} 00:00:00`)
          .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
          .order('created_at', { descending: true })
        if (error) {
          console.log(error)
        } else {
          setBreakfastData(data)
        }
      } catch (err) {
        console.log(err.message)
      }
    }
    getBreakfastData()
  }, [date])

  useEffect(() => {
    const calculateBreakfastTotals = () => {
      const initialTotals = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      };
      const updatedTotals = breakfastData.reduce((acc, item) => {
        acc.calories += item.calories
        acc.fat += item.fat
        acc.carbs += item.carbs
        acc.protein += item.protein
        return acc
      }, initialTotals)
      setBreakfastTotals(updatedTotals)
    }
    calculateBreakfastTotals()
  }, [breakfastData])

  const [lunchData, setLunchData] = useState([])
  const [lunchTotals, setLunchTotals] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  })

  useEffect(() => {
    const getLunchData = async () => {
      try {
        const { data, error } = await supabase
          .from('diary')
          .select('*')
          .eq('lunch', true)
          .eq('user_id', user)
          .gte('created_at', `${date.toISOString().split('T')[0]} 00:00:00`)
          .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
          .order('created_at', { descending: true })
        if (error) {
          console.log(error)
        } else {
          setLunchData(data)
        }
      } catch (err) {
        console.log(err.message)
      }
    };
    getLunchData()
  }, [date])

  useEffect(() => {
    const calculateLunchTotals = () => {
      const initialTotals = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      };
      const updatedTotals = lunchData.reduce((acc, item) => {
        acc.calories += item.calories
        acc.fat += item.fat
        acc.carbs += item.carbs
        acc.protein += item.protein
        return acc
      }, initialTotals)
      setLunchTotals(updatedTotals)
    };
    calculateLunchTotals()
  }, [lunchData])


  const [dinnerData, setDinnerData] = useState([]);
  const [dinnerTotals, setDinnerTotals] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });

  useEffect(() => {
    const getDinnerData = async () => {
      try {
        const { data, error } = await supabase
          .from('diary')
          .select('*')
          .eq('dinner', true)
          .eq('user_id', user)
          .gte('created_at', `${date.toISOString().split('T')[0]} 00:00:00`)
          .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
          .order('created_at', { descending: true })
        if (error) {
          console.log(error)
        } else {
          setDinnerData(data)
        }
      } catch (err) {
        console.log(err.message)
      }
    };
    getDinnerData()
  }, [date])

  useEffect(() => {
    const calculateDinnerTotals = () => {
      const initialTotals = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      };
      const updatedTotals = dinnerData.reduce((acc, item) => {
        acc.calories += item.calories
        acc.fat += item.fat
        acc.carbs += item.carbs
        acc.protein += item.protein
        return acc
      }, initialTotals);
      setDinnerTotals(updatedTotals)
    };
    calculateDinnerTotals()
  }, [dinnerData])

  const [snackData, setSnackData] = useState([]);
  const [snackTotals, setSnackTotals] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });
  
  useEffect(() => {
    const getSnackData = async () => {
      try {
        const { data, error } = await supabase
          .from('diary')
          .select('*')
          .eq('snack', true)
          .eq('user_id', user)
          .gte('created_at', `${date.toISOString().split('T')[0]} 00:00:00`)
          .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
          .order('created_at', { descending: true });
        if (error) {
          console.log(error);
        } else {
          setSnackData(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getSnackData();
  }, [date]);
  
  useEffect(() => {
    const calculateSnackTotals = () => {
      const initialTotals = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      };
      const updatedTotals = snackData.reduce((acc, item) => {
        acc.calories += item.calories;
        acc.fat += item.fat;
        acc.carbs += item.carbs;
        acc.protein += item.protein;
        return acc;
      }, initialTotals);
      setSnackTotals(updatedTotals);
    };
    calculateSnackTotals();
  }, [snackData]);
  

  return (
    <Grid container direction="row">
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}> 
        <Grid item sx={{ marginTop: 7}}>
          <DateNavigation/>
        </Grid>
        <Grid item > 
          <Box component="main" sx={{ bgcolor: 'background.default', p: 3, margin: 1}} >
            <MacroTrackingDisplay
            breakfastData = {breakfastData}
            breakfastTotals = {breakfastTotals}
            lunchData = {lunchData}
            lunchTotals = {lunchTotals}
            dinnerData = {dinnerData}
            dinnerTotals = {dinnerTotals}
            snackData = {snackData}
            snackTotals = {snackTotals}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <CalorieProgress/>
      </Grid>
    </Grid>
  )
}

export default DayDisplay