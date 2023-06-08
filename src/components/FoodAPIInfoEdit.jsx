const FoodAPIInfoEdit = ( { id, kcal, fat, protein, carbs, serving} ) => {

  return (
    <form id={id}>
      <label htmlFor="title"> Description </label>
      <input type="text" name = "title" defaultValue={label}/>
      <label htmlFor="calories"> Calories(kcal) </label>
      <input type="number" name = "calories" defaultValue={kcal}/>
      <label htmlFor="protein"> Protein(g) </label>
      <input type="number" name = "protein" defaultValue={protein}/>
      <label htmlFor="fat"> Fat(g) </label>
      <input type="number" name = "fat" defaultValue={fat}/>
      <label htmlFor="carbs"> carbs(g) </label>
      <input type="number" name = "carbs" defaultValue={carbs}/>
      <button type="submit"> </button>
    </form>
  )
}

export default FoodAPIInfoEdit