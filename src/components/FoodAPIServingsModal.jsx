import {Modal, Typography, TextField, Button, Grid } from '@mui/material';

const FoodAPIServingsModal = ({openModal, handleSubmit, handleServingChange, nutritionValues, initialValues, setOpenModal, handleCloseModal}) => {
  return  (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
        <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">{nutritionValues.foodLabel}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleServingChange}
                  label={`Serving size: g`}
                  name="serving_amt"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  defaultValue={initialValues.foodServing}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{ height: 40 }}
                />
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop: 5}}>
                <Typography>Calories: {Math.round(nutritionValues.foodKcal)}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>F: {Math.round(nutritionValues.foodFat)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>C: {Math.round(nutritionValues.foodCarbs)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>P: {Math.round(nutritionValues.foodProtein)}g</Typography>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth 
              sx={{ marginTop: 5,
                backgroundColor: `rgb(196, 155, 178)`, 
                color: `rgb(255,255,255)`, 
                '&:hover': {
                backgroundColor: `rgb(196, 155, 178)`, 
                color: `rgb(255,255,255)`}}}
              >
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default FoodAPIServingsModal