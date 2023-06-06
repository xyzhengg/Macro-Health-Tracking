import { useDate } from '../contexts/DateProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect } from 'react';

const CalendarDisplay = ( {setShowCalendar}) => {
  const {date, setDate} = useDate()

  useEffect(() => {
    console.log(date)
  }, [date])

  const handleOnchange = async (newDate) => {
    await setDate(newDate)
    setShowCalendar(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar value={date} onChange={handleOnchange} />
    </LocalizationProvider>
  );
}

export default CalendarDisplay