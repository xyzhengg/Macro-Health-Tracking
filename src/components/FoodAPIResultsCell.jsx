import { styled} from '@mui/material/styles';
import {TableCell, TableRow} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FoodAPIResultsCell = ({ id, label, kcal, fat, protein, carbs, serving, handleClick}) => {
  return (
    <StyledTableRow key={id} sx={{width: 200}}>
      <TableCell align="left" sx={{ fontStyle: "italic", width:"8rem"}}>{label}</TableCell>
      <TableCell align="left">Serving: {serving ? `${Math.round(serving.quantity)}g` : '100g'}</TableCell>
      <TableCell align="left">F: {Math.round(fat)}g</TableCell>
      <TableCell align="left">C: {Math.round(carbs)}g</TableCell>
      <TableCell align="left">P:{Math.round(protein)}g</TableCell>
      <TableCell align="left">Cal: {Math.round(kcal)}kcal</TableCell>
      <TableCell align="left"><AddCircleOutlineIcon onClick={handleClick} id={id}/></TableCell>
    </StyledTableRow>
  )
}
export default FoodAPIResultsCell


