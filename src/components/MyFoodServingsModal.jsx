import {Modal, Typography, TextField, Button, Grid } from '@mui/material';

const MyFoodServingsModal = ({openModal, handleCloseModal, handleSaveFood, foodData, initialFoodData, handleServingChange}) => {
  return  (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
        <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
          <form onSubmit={handleSaveFood}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">{foodData.food_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleServingChange}
                  label={`Serving size ${initialFoodData.serving_measure || 'g'}`}
                  name="serving_amt"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  defaultValue={foodData.serving_amt}
                  step="0.01"
                  min="0"
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{ height: 40 }}
                />
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop: 5}}>
                <Typography>Calories: {Math.round(foodData.calories)}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>F: {Math.round(foodData.fat)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>C: {Math.round(foodData.carbs)}g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>P: {Math.round(foodData.protein)}g</Typography>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth 
              sx={{ marginTop: 5,
              backgroundColor: `rgb(196, 155, 178)`, 
              color: `rgb(255,255,255)`, '&:hover': {
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

export default MyFoodServingsModal