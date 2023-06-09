import ChartWeightLine from "../components/ChartWeightLine"
import ChartCalories from "../components/ChartCalories"
import { Typography, Grid} from "@mui/material"

const Statistics = () => {

  return(
    <Grid container sx={{marginTop: 5}}>
      <ChartWeightLine/>
      <ChartCalories/>
    </Grid>
  )
}

export default Statistics