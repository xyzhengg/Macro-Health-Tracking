import { supabase } from "../supabaseAuth/supabaseClient"
import { MenuItem , Menu, IconButton, Typography, Box, Grid, TextField, Button, Modal } from '@mui/material';
import { MoreVert, Edit, DeleteForever  } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthProvider";
import { useDate } from "../contexts/DateProvider";

const DataEditDeleteButton = ({ id }) => {
  const { user } = useAuth()
  const { date, setDate } = useDate()
  const [loading, setLoading] = useState(false)
  const [foodData, setFoodData] = useState({
    food_name: "",
    serving_amt: "",
    serving_measure: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: ""
  })
  const [initialFoodData, setInitialFoodData] = useState('')

  const [onDisplay, setOnDisplay] = useState(null)
  const open = Boolean(onDisplay)
  const [openModal, setOpenModal] = useState(false)

  const handleClick = (e) => {
    setOnDisplay(e.currentTarget)
  }

  const handleClose = () => {
    setOnDisplay(null)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleDelete = async (e) => {
    handleClose()
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('diary')
        .delete()
        .eq('id', e.currentTarget.id)
      if (error) {
        console.log(error)
      } else {
        setLoading(false)
        setDate(new Date(date.getTime() + 10000))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditModal = async (e) => {
    handleClose()
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('diary')
        .select('*')
        .eq('id', id)
      if (error) {
        console.log(error)
      } else {
        setLoading(false)
        setOpenModal(true)
        setInitialFoodData(data[0])
        setFoodData(data[0])
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleServingChange = (e) => {
    const newServing = e.target.value;
    // console.log(e.target.value)
    setFoodData({
      ...foodData,
      serving_amt: newServing
    })
  }
    
  useEffect(() => {
      const { serving_amt } = foodData
      const servingMultiplier = serving_amt / initialFoodData.serving_amt
      const newKcal = initialFoodData.calories * servingMultiplier
      const newProtein = initialFoodData.protein * servingMultiplier
      const newFat = initialFoodData.fat  * servingMultiplier
      const newCarbs = initialFoodData.carbs  * servingMultiplier
      setFoodData((prevFoodData) => ({
        ...prevFoodData,
        serving_amt: serving_amt,
        calories: newKcal,
        protein: newProtein,
        fat: newFat,
        carbs: newCarbs,
      }));
  },[foodData.serving_amt])


  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
      .from('diary')
      .update({ 
        serving_amt: foodData.serving_amt,
        calories: foodData.calories,
        fat: foodData.fat,
        protein: foodData.protein,
        carbs: foodData.carbs
       })
      .eq('id', id)
      if (error) {
        console.log(error)
      } else {
        setDate(new Date(date.getTime() + 10000))
        setInitialFoodData("")
        setFoodData({
          food_name: "",
          serving_amt: "",
          serving_measure: "",
          calories: "",
          protein: "",
          fat: "",
          carbs: ""
        })
        handleCloseModal()
      }
    }
    catch (err){
      console.log(err)
    }    
  }

  return (
    <>
      <IconButton color="neutral" variant="plain" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={onDisplay} open={open} onClose={handleClose} placement="right-start">
        <MenuItem id={id} onClick={handleEditModal}>
          <IconButton>
            <Edit />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem id={id} onClick={handleDelete} variant="soft" sx={{color: `rgb(207, 27, 27)`}}>
          <IconButton sx={{ color: 'inherit' }}>
            <DeleteForever />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>

      { foodData && (
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
          <Grid container sx={{ maxWidth: 350, marginTop: 10, padding: 5, position: 'absolute', left: '58%', transform: 'translate(-50%, -50%)', top: '40%', bgcolor: 'background.paper', border: '1px solid #b8b8b8', borderRadius: '0.5rem', boxShadow: 24 }}>
            <form onSubmit={handleSaveEdit}>
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
                <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 5 }}>
                  Save
                </Button>
              </form>
            </Grid>
        </Grid>
      </Modal>
      )
      }
    </>
  )
}

export default DataEditDeleteButton;