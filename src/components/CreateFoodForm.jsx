const CreateFoodForm = () => {

  return (
    <form>
      <label htmlFor="title"> Description </label>
      <input type="text" name="title"/>

      <label htmlFor="serving">Serving</label>
      <div>
        <input type="number" name="serving"/>
        <input type="text" maxlength="25" name="measure"/>
      </div>

      <label htmlFor="notes"> Notes </label>
      <input type="textbox" name="notes"/>

      <label htmlFor="calories"> Calories(kcal) </label>
      <input type="number" name="calories" />
      <label htmlFor="protein"> Protein(g) </label>
      <input type="number" name="protein" />
      <label htmlFor="fat"> Fat(g) </label>
      <input type="number" name="fat" />
      <label htmlFor="carbs"> carbs(g) </label>
      <input type="number" name="carbs" />
      <button type="submit"> Next </button>
    </form>
  )
}

export default CreateFoodForm