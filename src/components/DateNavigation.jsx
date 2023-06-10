import { useState } from 'react';
import { useDate } from '../contexts/DateProvider';
import CalendarDisplay from './CalendarDisplay';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, Box, Popover, Typography } from '@mui/material';

const DateNavigation = () => {
  const { date, setDate } = useDate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  } 
  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl)

  const handleLeftArrow = () => {
    setDate(new Date(date.getTime() - 86400000))
  }

  const handleRightArrow = () => {
    setDate(new Date(date.getTime() + 86400000))
    console.log(new Date(date.getTime() + 86400000))
  }

  return (
    <Grid container direction="column">
      <Grid container direction="row" alignItems="center">
        <Grid item> 
          <Button onClick={handleLeftArrow} sx={{color: '#3c274a'}}> <ArrowBackIosIcon/> </Button>
        </Grid>
        <Grid item> 
          <Button onClick={handleClick}> 
          <Typography variant="h4" sx={{color: '#3c274a'}}>
          {
            date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? "TODAY" :
            date.toISOString().split('T')[0] === new Date(Date.now() - 86400000).toISOString().split('T')[0] ? "YESTERDAY" :
            date.toISOString().split('T')[0] === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? "TOMORROW" :
            date.toDateString()
          }
          </Typography>
          </Button>
        </Grid>
        <Grid item> 
          <Button onClick = {handleRightArrow} sx={{color: '#3c274a'}}> <ArrowForwardIosIcon/> </Button>
        </Grid>
      </Grid>
      <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClick={handleCloseCalendar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{ vertical: 'top', horizontal: 'center'}}
      >
        <CalendarDisplay />
      </Popover>
      </>
    </Grid>
  )
}

export default DateNavigation



