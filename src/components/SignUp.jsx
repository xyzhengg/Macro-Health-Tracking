import { supabase } from '../supabaseAuth/supabaseClient';
import { useState } from 'react';

const SignUp = () => {
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))

    try {
      const { data, error } = await supabase.auth.signUp(
      {
        email: fields.email,
        password: fields.password,
        options: {
          emailRedirectTo: '/login'
        }
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
  }

  return (
    <form onSubmit={handleSignUp}>
      <label htmlFor="email"> Email</label>
      <input type="email" name="email" placeholder="email" />
      <label htmlFor="email"> Password</label>
      <input type="password" name="password" placeholder="password" />
      {error && <div>Error: {error}</div>}
      <button type="submit"> Sign Up </button>
    </form>
  )
  
}

export default SignUp;


