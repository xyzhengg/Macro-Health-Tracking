import { useDate } from '../contexts/DateProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DateCalendarValue() {
  const {date, setDate} = useDate()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
    </LocalizationProvider>
  );
}
