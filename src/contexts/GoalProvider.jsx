import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { supabase } from '../supabaseAuth/supabaseClient';

const GoalContext = createContext()

export const useGoal = () => {
  return useContext(GoalContext)
}

export const GoalProvider = ({ children }) => {
  const [goal, setGoal] = useState({
    goal_calories: 0,
    goal_weight: 0,
    fat: 0,
    carbs: 0,
    protein: 0
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
      const getGoalData = async () => {
        try {
          const { data, error } = await supabase
            .from('user_profile')
            .select('goal_calories, goal_weight, fat, carbs, protein')
            .eq('user_id', user)
            .limit(1)
          if (error) {
            setError(error)
            console.log(error)
          } else {
            setLoading(false)
            setGoal(data[0])
            console.log(data[0])
          }
        } catch (err) {
          setError(err.message)
          console.log(err.message)
        }
      };
      getGoalData()
  }, [])

  return (
    <GoalContext.Provider value={{goal, setGoal}}>
      {children}
    </GoalContext.Provider>
  )
}