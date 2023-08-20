import {Box, Grid, Table, TableBody, TableContainer, Paper } from '@mui/material';
import SearchBar from "../components/SearchBar";
import AddCustomItemButton from "../components/AddCustomItemButton";
import MyFoodItemCell from "../components/MyFoodItemCell";
import MyFoodServingsModal from "../components/MyFoodServingsModal";
import FoodItemTableRow from "../components/FoodItemTableRow";
import CreateFoodForm from "../components/CreateFoodForm";

const RecipeIngredientFoodLibrarySearcher = ({ 
  showCreateFoodForm, 
  handleCancel, 
  handleSearchFood,
  searchInputWidth, 
  handleCreateFood,
  handleCloseCreateFoodForm,
  allFoodData,
  searchingFood,
  myFoodSearchResult,
  searchFoodTerm,
  foodData,
  openFoodServingsModal,
  handleCloseFoodServingsModal,
  handleAddFood,
  initialFoodData,
  handleFoodServingChange,
  handleSelectFood
   }) => {
  
  return (
    <>
    { showCreateFoodForm ? 
      <CreateFoodForm
      handleCancel = {handleCancel}/> : 
    (
      <Grid container direction="column" justifyContent="center" alignItems="center">
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, marginTop: 5 }}>
      <Grid item>
          <form onSubmit={handleSearchFood}>
            <SearchBar 
              searchInputWidth = {searchInputWidth}
            />
          </form>
        </Grid>
        <AddCustomItemButton 
          handleClick = {handleCreateFood}
          handleCancel = {handleCloseCreateFoodForm}
        />
      </Box>

{/* // Shows all current foods */}
    
    {allFoodData && !searchingFood &&
    allFoodData.map(([letter, foods]) => (
      <TableContainer component={Paper} key={letter} sx={{ minWidth: 400, maxWidth: 800 }}>
        <Table size="small">
          <FoodItemTableRow
            text={letter}
          />
          <TableBody>
          {foods.map((food) => (
            <MyFoodItemCell
              key={food.id}
              id={food.id}
              food_name={food.food_name}
              serving_amt={food.serving_amt}
              serving_measure={food.serving_measure || 'g'}
              fat={food.fat}
              carbs={food.carbs}
              protein={food.protein}
              calories={food.calories}
              handleClick={handleSelectFood}
            />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ))}

{/* // Shows food search results */}
    
    {searchingFood && myFoodSearchResult && (
      <TableContainer component={Paper} sx={{ minWidth: 400, maxWidth: 800 }}>
        <Table size="small">
        <FoodItemTableRow
            text={searchFoodTerm.toUpperCase()}
          />
          <TableBody>
          {myFoodSearchResult.map((food) => (
            <MyFoodItemCell
              key={food.id}
              id={food.id}
              food_name={food.food_name}
              serving_amt={food.serving_amt}
              serving_measure={food.serving_measure || 'g'}
              fat={food.fat}
              carbs={food.carbs}
              protein={food.protein}
              calories={food.calories}
              handleClick={handleSelectFood}
            />
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

    { foodData && 
    <MyFoodServingsModal
      openModal = {openFoodServingsModal}
      handleCloseModal = {handleCloseFoodServingsModal}
      handleSaveFood ={handleAddFood}
      foodData = {foodData}
      initialFoodData = {initialFoodData}
      handleServingChange={handleFoodServingChange}
    /> }
  </Grid>
  )
  }
  </>
)
}

export default RecipeIngredientFoodLibrarySearcher