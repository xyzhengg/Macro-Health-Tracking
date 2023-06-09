import { useDate } from '../contexts/DateProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect } from 'react';

const CalendarDisplay = ( {}) => {
  const {date, setDate} = useDate()

  useEffect(() => {
  }, [date])

  const handleOnChange = async (newDate) => {
    await setDate(newDate)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar value={date} onChange={handleOnChange} width="100%"/>
    </LocalizationProvider>
  );
}

export default CalendarDisplay