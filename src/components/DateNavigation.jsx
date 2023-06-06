import { useState } from 'react';
import { useDate } from '../contexts/DateProvider';
import CalendarDisplay from './CalendarDisplay';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid } from '@mui/material';


const DateNavigation = () => {
  const { date, setDate } = useDate()
  const [showCalendar, setShowCalendar] = useState(false)
 
  const handleShowCalendar = () => {
    setShowCalendar(true)
  }

  const handleLeftArrow = () => {
    setDate(new Date(date.getTime() - 86400000))
  }

  const handleRightArrow = () => {
    setDate(new Date(date.getTime() + 86400000))
    console.log(new Date(date.getTime() + 86400000))
  }

  return (
    <Grid container direction="column">
      <Grid container direction="row">
        <Grid item> 
          <Button onClick={handleLeftArrow}> <ArrowBackIosIcon/> </Button>
        </Grid>
        <Grid item> 
          <Button onClick={handleShowCalendar}> 
          {
            date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? "TODAY" :
            date.toISOString().split('T')[0] === new Date(Date.now() - 86400000).toISOString().split('T')[0] ? "YESTERDAY" :
            date.toISOString().split('T')[0] === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? "TOMORROW" :
            date.toDateString()
          }
          </Button>
        </Grid>
        <Grid item> 
          <Button onClick = {handleRightArrow}> <ArrowForwardIosIcon/> </Button>
        </Grid>
      </Grid>
      {showCalendar && 
      <Grid container>
        <CalendarDisplay setShowCalendar = {setShowCalendar}/>
      </Grid>  
      }
    </Grid>
  )
}

export default DateNavigation




