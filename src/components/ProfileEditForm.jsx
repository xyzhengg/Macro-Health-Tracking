import { useAuth } from "../contexts/AuthProvider"

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
        first_name: fields.firstname,
        last_name: fields.lastname,
        goal_weight: fields.goalweight,
        goal_calories: fields.goalcalories
        }
      ])
      if (error) {
        setError(error.message)
      } else {
        setSuccess("Your profile has been updated! Redirecting...")
      }
    }
    catch (err){
      setError(err.message)
    }    
    setLoading(false)
  }
  return (
    <>  
      <form onClick = {handleSubmitProfile}> 
        <label htmlFor="firstname" placeholder="First name" required> First name</label>
        <input type="text" name="firstname" required></input>
        <label htmlFor="lastname" placeholder="Last name" required> Last name</label>
        <input type="text" name="lastname" required></input>
        <label htmlFor="goalweight" required> Goal Weight</label>
        <input type="number" name="goalweight"></input>
        <label htmlFor="goalcalories" required> Calorie Intake</label>
        <input type="number" name="goalcalories"></input>
      </form>
      { error && <p> Error: { error } </p>}
      { success && <p> { success } </p>}
    </>
  )
}

export default ProfileEditForm