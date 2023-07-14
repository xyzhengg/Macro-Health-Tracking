import {Table, TableBody, TableContainer, Paper } from '@mui/material';
import FoodAPIResultsCell from './FoodAPIResultsCell'
import FoodItemTableRow from './FoodItemTableRow';


const FoodAPIResultsTable = ({searchTerm, filteredResults, handleSelectFood}) => {
  return (
    <TableContainer component={Paper} sx={{ minWidth: 400, maxWidth: 800, display: 'flex', justifyContent: 'center' }}>
      <Table size="small">
        <FoodItemTableRow
          text={searchTerm.toUpperCase()}
        />
        <TableBody>
        {filteredResults.map((result) => (
          <FoodAPIResultsCell
          key = {result.food.foodId}
          id= {result.food.foodId}
          label = {result.food.label}
          kcal = {result.food.nutrients.ENERC_KCAL}
          fat = {result.food.nutrients.FAT}
          protein = {result.food.nutrients.PROCNT}
          carbs = {result.food.nutrients.CHOCDF}
          searchTerm = {searchTerm}
          handleClick={(e) => handleSelectFood(e, result.food)}
          serving = {result.food.servingSizes && result.food.servingSizes.find((serving) => serving.label === "gram")}
          />
        ))}  
        </TableBody>  
      </Table>
    </TableContainer>
  )
}

export default FoodAPIResultsTable