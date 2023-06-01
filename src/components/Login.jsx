import { useState, useEffect } from 'react'
import { supabase } from '../supabaseAuth/supabaseClient';

const Login = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fields = Object.fromEntries(new FormData(e.target))

    try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: fields.email,
      password: fields.password,
    })
    if (error) {
      setError(error.message)
      console.log(error)
    } 
  } 
  catch (err) {
    setError(err.message)
    console.log(err.message)
  }
  setLoading(false)
  const { data, error } = await supabase.auth.getSession()
  setSession(data)
  console.log(data)
  }
  
  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      {session && <div> Sign in sucessful! Redirecting... </div>}
      {error && <div> Error: {error} </div>}
      <button type="submit"> Login </button>
    </form>
  )
}

export default Login