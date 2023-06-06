import { useState, useEffect } from 'react'
import { supabase } from '../supabaseAuth/supabaseClient';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSession(false)
    const fields = Object.fromEntries(new FormData(e.target))

    try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: fields.email,
      password: fields.password,
    })
    if (error) {
      setError(error.message)
      console.log(error)
    } else {
      setUser(data.user.id)
      setSession(true)
      console.log(user)
      navigate('/')
    }
    } 
  catch (err) {
    setError(err.message)
    console.log(err.message)
  }
  setLoading(false)
  }
  
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email"> Email</label>
      <input type="email" name="email" placeholder="email" />
      <label htmlFor="email"> Password</label>
      <input type="password" name="password" placeholder="password" />
      {session && <div> Sign in sucessful! Redirecting... </div>}
      {error && <div> Error: {error} </div>}
      <button type="submit"> Login </button>
    </form>
  )
}

export default Login