import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { useMeal } from '../contexts/MealContext';
import DataEditDeleteButton from './DataEditDeleteButton';

const DinnerTable = ( {dinnerData, dinnerTotals, handleDelete}) => {
  const {setMeal} = useMeal()
  const handleSelectMeal = () => {
    setMeal('dinner')
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#afc2d6',
      color: theme.palette.common.white,
      fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
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
            <StyledTableCell sx={{width: 200}}>Dinner</StyledTableCell>
            <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Protein&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Calories&nbsp;(kcal)</StyledTableCell>
            <StyledTableCell sx={{ width: '10px' }}>
            <IconButton onClick={handleSelectMeal}>
                <Link to="/search" id="dinner">
                  <AddCircleOutlineIcon />
                </Link>
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dinnerData.map((eachData) => (
            <StyledTableRow key={eachData.id}>
              <StyledTableCell>{eachData.food_name}</StyledTableCell>
              <StyledTableCell align="center">{eachData.fat.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">{eachData.carbs.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">{eachData.protein.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">{eachData.calories.toFixed(1)}</StyledTableCell>
              <StyledTableCell align="center">
                <DataEditDeleteButton id={eachData.id} handleDelete={handleDelete}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
            <StyledTableRow>
              <StyledTableCell style={{ fontWeight: 'bold' }}> Total: </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {dinnerTotals.fat.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {dinnerTotals.carbs.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {dinnerTotals.protein.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: 'bold' }}> {dinnerTotals.calories.toFixed(1)} </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DinnerTable