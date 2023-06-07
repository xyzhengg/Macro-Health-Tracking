import { supabase } from '../supabaseAuth/supabaseClient';
import { useState } from 'react';

const Logout = () => {
  const [error, setError] = useState(null)
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
        console.log(error)
      } else {
        localStorage.removeItem("authSession")
      }
    }
    catch (err) {
      setError(err.message)
      console.log(err.message)
    }
    const { data, error } = await supabase.auth.getSession()
    console.log(data)
    localStorage.removeItem("authSession")
  }

return (
  <>
    <button onClick = {handleLogout}> Logout </button>
    {error && <div> Error logging out: {error} </div>}
  </>
  )
}

export default Logout