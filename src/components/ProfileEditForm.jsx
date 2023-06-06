import { useAuth } from "../contexts/AuthProvider"
import { supabase } from "../supabaseAuth/supabaseClient"
import { useState } from "react"

const ProfileEditForm = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmitProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fields = Object.fromEntries(new FormData(e.target))
    
    try {
      const { data, error } = await supabase
      .from('user_profile')
      .insert([
        {user_id: user,
        first_name: fields.firstname.charAt(0).toUpperCase() + fields.firstname.slice(1).toLowerCase(),
        last_name: fields.lastname.charAt(0).toUpperCase() + fields.lastname.slice(1).toLowerCase(),
        goal_weight: fields.goalweight,
        goal_calories: fields.goalcalories
        }
      ])
      if (error) {
        setError(error.message)
        console.log(error)
      } else {
        setSuccess("Your profile has been updated! Redirecting...")
      }
    }
    catch (err){
      setError(err.message)
      console.log(error)
    }    
    setLoading(false)
  }
  return (
    <>  
      <form onSubmit = {handleSubmitProfile}> 
        <label htmlFor="firstname" placeholder="First name" required> First name</label>
        <input type="text" name="firstname" required/>

        <label htmlFor="lastname" placeholder="Last name" required> Last name</label>
        <input type="text" name="lastname" required/>

        <label htmlFor="goalweight" required> Goal Weight</label>
        <input type="number" name="goalweight"/>

        <label htmlFor="goalcalories" required> Calorie Intake</label>
        <input type="number" name="goalcalories"/>

        <button type="submit"> Save </button>
      </form>
      { error && <p> Error: { error } </p>}
      { success && <p> { success } </p>}
    </>
  )
}

export default ProfileEditForm