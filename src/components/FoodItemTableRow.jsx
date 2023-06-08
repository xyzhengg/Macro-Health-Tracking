import {TableCell, TableHead, TableRow } from '@mui/material';

const FoodItemTableRow = ({text}) => {

  return(
    <TableHead>
      <TableRow>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}>{text}</TableCell>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}></TableCell>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}></TableCell>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}></TableCell>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}></TableCell>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}></TableCell>
        <TableCell sx={{ backgroundColor: '#afc2d6' }}></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default FoodItemTableRow