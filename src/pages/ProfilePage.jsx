import { useAuth } from "../contexts/AuthProvider"
import { Button } from "@mui/material"
import Typography from '@mui/material/Typography';
import { supabase } from "../supabaseAuth/supabaseClient"
import { useEffect } from "react";


const ProfilePage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState([])
  setLoading(true)

  useEffect (() => {
    const getProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profile')
          .select("*")
          .eq('user_id', user)
        if (error) {
          setError(error)
        } else {
          setLoading(false)
          setProfileData(data)
          console.log(data)
        }
      } catch (err) {
        setError(err.message)
      }
    }
    getProfileData()
  }, [])
  

  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <Typography level="h2"> Personal Profile </Typography>
      <Typography level="h3"> </Typography>
      <Typography> </Typography>
      <Typography> </Typography>
      <Typography> </Typography>
      <Typography> </Typography>
      <Typography> </Typography>
      <Typography> </Typography>
      <Button> Edit </Button>
    </Card>
  )
}

export default ProfilePage