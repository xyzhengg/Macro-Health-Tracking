import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from '../supabaseAuth/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const gotSession = localStorage.getItem('authSession');
      if (gotSession) {
        const sessionData = JSON.parse(gotSession)
        setSession(JSON.parse(gotSession))
        setUser(sessionData.user.id)
    }

    async function getSession() {
      setLoading(false)
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            // console.log("New session: ", session)
            setUser(session.user.id)
            localStorage.setItem("authSession", JSON.stringify(session))
            setSession(session)
          } else {
            localStorage.removeItem("authSession")
            setSession(null)
            setUser(null)
          }
          setLoading(false)
        }
      )
      return () => {
        subscription?.unsubscribe()
      }
    }
    getSession()
  }, [])

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
  })


  return (
    <AuthContext.Provider value={{ setUser, user, setSession, session}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


// https://levelup.gitconnected.com/the-easy-react-supabase-authentication-and-session-storage-dedeb4abe45e