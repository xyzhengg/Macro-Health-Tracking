import { useState } from 'react';
import { useDate } from '../contexts/DateProvider';
import CalendarDisplay from './CalendarDisplay';
import Button from '@mui/material/Button';


const DateNavigation = () => {
  const { date, setDate } = useDate()
  const [showCalendar, setShowCalendar] = useState(false)
 
  const handleShowCalendar = () => {
    setShowCalendar(true)
  }

  return (
    <>
      <Button onClick={handleShowCalendar}> TODAY </Button>
      {showCalendar && <CalendarDisplay/>}
    </>
  )

}

export default DateNavigation




