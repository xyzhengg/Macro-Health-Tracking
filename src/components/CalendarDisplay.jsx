import { useDate } from '../contexts/DateProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect } from 'react';

const CalendarDisplay = ( {setShowCalendar}) => {
  const {date, setDate} = useDate()

  useEffect(() => {
  }, [date])

  const handleOnChange = async (newDate) => {
    await setDate(newDate)
    console.log(newDate)
    setShowCalendar(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar value={date} onChange={handleOnChange} width="100%"/>
    </LocalizationProvider>
  );
}

export default CalendarDisplay