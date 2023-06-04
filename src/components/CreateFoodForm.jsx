import { supabase } from '../supabaseAuth/supabaseClient';

const CreateFoodForm = () => {
  const handleAddCustomFood = async (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))
    const { calories, carbs, fat, measure, notes, protein, serving, title } = fields
    console.log(fields)

    try {
      const { data, error } = await supabase
      .from('food')
      .insert([
        {food_name: title, 
        calories: calories,
        fat: fat,
        protein: protein,
        carbs: carbs,
        serving_amt: serving,
        serving_measure: measure,
        notes: notes
        }
      ])
      if (error) {
        console.log(error)
      }
      const { data: data2, error: error2 } = await supabase
      .from('diary')
      .insert([
        {food_name: title, 
          calories: calories,
          fat: fat,
          protein: protein,
          carbs: carbs,
          serving_amt: serving,
          serving_measure: measure
        }
      ])
      if (error2) {
        console.log(error2)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <form onSubmit={handleAddCustomFood}>
      <label htmlFor="title"> Description </label>
      <input type="text" name="title"/>
      <br/>

      <div>
        <label htmlFor="serving">Serving</label>
        <input type="number" name="serving"/>
        <input type="text" maxLength="25" name="measure" placeholder="e.g.   g, cup, oz, kg" defaultValue="g"/>
      </div>
      <br/>

      <label htmlFor="notes"> Notes </label>
      <input type="textbox" name="notes"/>
      <br/>

      <label htmlFor="calories"> Calories(kcal) </label>
      <input type="number" name="calories" />
      <br/>
      <label htmlFor="protein"> Protein(g) </label>
      <input type="number" name="protein" />
      <br/>
      <label htmlFor="fat"> Fat(g) </label>
      <input type="number" name="fat" />
      <br/>
      <label htmlFor="carbs"> Carbs(g) </label>
      <input type="number" name="carbs" />
      <br/>
      <button type="submit"> Next </button>
    </form>
  )
}

export default CreateFoodForm