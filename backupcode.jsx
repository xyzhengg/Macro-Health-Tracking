// import { createContext, useContext, useState, useEffect } from "react";
// import { supabase } from '../supabaseAuth/supabaseClient';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     const sessionToken = localStorage.getItem('session');
//       if (sessionToken) {
//       setSession(sessionToken);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const session = await supabase.auth.getSession()
//         if (session) {
//           setUser(session.data.session.user.id)
//           console.log(session.data.session.access_token)
//           localStorage.setItem('session', session.data.session.access_token)
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error)
//         setUser(null)
//       }
//     }
//     fetchUser()
//   }, [])

  


//   // supabase.auth.onAuthStateChange((event, session) => {
//   //   if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
//   // })


//   // supabase.auth.onAuthStateChange((event, session) => {
//   //   if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
//   // })

  
//   supabase.auth.onAuthStateChange((event, session) => {
//     console.log(event, session)
//   })

//   return (
//     <AuthContext.Provider value={{user, setUser, session, setSession}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }