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
        const req = await supabase.auth.getSession()
        if (req) {
          setUser(req.data.session.user.id)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      }
    }
    fetchUser()
  }, [])


  // supabase.auth.onAuthStateChange((event, session) => {
  //   if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
  // })


  // supabase.auth.onAuthStateChange((event, session) => {
  //   if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
  // })

  
  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log(event, session)
  // })

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
