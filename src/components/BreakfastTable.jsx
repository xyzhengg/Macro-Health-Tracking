import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { useMeal } from '../contexts/MealContext';
import DataEditDeleteButton from './DataEditDeleteButton';

const BreakfastTable = ( {breakfastData, breakfastTotals}) => {
  const { setMeal } = useMeal()
  const handleSelectMeal = () => {
    setMeal('breakfast')
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#c49bb2',
      color: theme.palette.common.white,
      fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ minWidth: 400, maxWidth: 700 }}>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{width: 200}}>Breakfast</StyledTableCell>
            <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Protein&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Calories&nbsp;(kcal)</StyledTableCell>
            <StyledTableCell sx={{ width: '10px' }}>
            <IconButton onClick={handleSelectMeal}>
                <Link to="/food-recipe-searcher" id="breakfast">
                  <AddCircleOutlineIcon />
                </Link>
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breakfastData.map((eachData) => (
            <StyledTableRow key={eachData.id} id={eachData.id}>
              <StyledTableCell>{eachData.food_name}</StyledTableCell>
              <StyledTableCell align="center">{eachData.fat.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">{eachData.carbs.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">{eachData.protein.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">{eachData.calories.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">
                <DataEditDeleteButton />
              </StyledTableCell>
            </StyledTableRow>
          ))}
            <StyledTableRow>
              <StyledTableCell style={{ fontWeight: 'bold' }}> Total: </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {breakfastTotals.fat.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {breakfastTotals.carbs.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {breakfastTotals.protein.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {breakfastTotals.calories.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BreakfastTable