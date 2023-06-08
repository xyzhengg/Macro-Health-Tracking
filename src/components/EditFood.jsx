const handleEdit = async (e) => {
  console.log(date)
  handleClose()
  setLoading(true)
  try {
    const { data, error } = await supabase
    .from('diary')
    .select('*')
    .eq('id', e.currentTarget.id)
    if (error) {
      console.log(error)
    } else {
      setLoading(false)
      setFoodData(data[0])
      // setDate(new Date(date.getTime() + 1))
      console.log(date)
    }
  } catch (err) {
    console.log(err)
  }
}

const handleSaveEdit = () => {

}

return (
  <>
    <IconButton color="neutral" variant="plain" onClick={handleClick}>
      <MoreVert />
    </IconButton>
    <Menu anchorEl={onDisplay} open={open} onClose={handleClose} placement="right-start">
      <MenuItem onClick={handleEdit}>
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
    <Modal open={isModalOpen} onClose={handleCloseModal()} >
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} >
        {foodData && (
        <Grid container sx={{ maxWidth: 350, marginTop: 10}}>
          <form onSubmit={handleSaveEdit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField label="Food Name" name="food_name" variant="outlined" margin="normal" defaultValue={foodData.food_name} InputLabelProps={{ shrink: true }} fullWidth sx={{ height: 40 }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Serving size" name="serving_amt" type="number" variant="outlined" margin="normal" defaultValue={foodData.serving } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
                <TextField label="Serving measure (e.g. g, cup, ml)" name="serving_amt" type="text" variant="outlined" margin="normal" defaultValue={foodData.serving_measure } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Calories (kcal)" name="calories"  type="number"variant="outlined" margin="normal" defaultValue={foodData.calories} InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Fat (g)" name="fat" type="number" variant="outlined" margin="normal" defaultValue={foodData.fat } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Carbohydrate (g)" name="carbs" type="number" variant="outlined" margin="normal" defaultValue={foodData.carbs } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Protein (g)" name="protein" type="number" variant="outlined" margin="normal" defaultValue={foodData.protein } InputLabelProps={{ shrink: true }} required fullWidth sx={{ height: 40 }}/>
              </Grid>

            </Grid>
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 5 }}> Save </Button>
        </form>
        {success && ( <Typography variant="body1" align="center" > {success} </Typography> )}
      </Grid>
    )}
  </Grid>
</>
)
}