import {TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MyFoodItemCell = ( {id, food_name, serving_amt, serving_measure, fat, carbs, protein, calories, handleClick}) => {
  return(
    <StyledTableRow key={id} sx={{width: 200}}>
      <TableCell align="left" sx={{ fontStyle: "italic", width:"8rem"}}>{food_name}</TableCell>
      <TableCell align="left">{`${serving_amt} ${serving_measure !== null ? serving_measure : 'g'}`}</TableCell>
      <TableCell align="left">F: {Math.round(fat)}g</TableCell>
      <TableCell align="left">C: {Math.round(carbs)}g</TableCell>
      <TableCell align="left">P:{Math.round(protein)}g</TableCell>
      <TableCell align="left">kCal: {Math.round(calories)}kcal</TableCell>
      <TableCell align="left"><AddCircleOutlineIcon onClick={handleClick} id={id}/></TableCell>
    </StyledTableRow>
  )
}

export default MyFoodItemCell