import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { supabase } from '../supabaseAuth/supabaseClient';

const GoalContext = createContext()

export const useGoal = () => {
  return useContext(GoalContext)
}

export const GoalProvider = ({ children }) => {
  const [goal, setGoal] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const getGoalData = async () => {
        try {
          const { data, error } = await supabase
            .from('user_profile')
            .select('goal_calories, goal_weight, fat, carbs, protein')
            .eq('user_id', user)
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
    }
  }, [])

  return (
    <GoalContext.Provider value={{goal, setGoal}}>
      {children}
    </GoalContext.Provider>
  )
}