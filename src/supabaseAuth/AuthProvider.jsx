import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from '../supabaseAuth/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser()
        if (error) {
          throw error
        }
        setUser(user)
        console.log(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={ user }>
      {children}
    </AuthContext.Provider>
  )
}
