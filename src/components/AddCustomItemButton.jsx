import {Grid, Button } from '@mui/material';

const AddCustomItemButton = ({handleClick}) => {

  return (
    <Grid item sx={{marginLeft: 20}}>
          <Button onClick={handleClick} sx={{
              height: "40px",
              backgroundColor: `rgb(175, 194, 214)`,
              color: `rgb(255,255,255)`,
              '&:hover': {
              backgroundColor: `rgb(175, 194, 214)`,
              color: `rgb(255,255,255)`,
              transform: 'scale(1.05)',
              }}}>
              + Add
            </Button>
        </Grid>
  )
}

export default AddCustomItemButton