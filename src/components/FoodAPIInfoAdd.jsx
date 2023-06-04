import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const FoodAPIInfoAdd = () => {
  const location = useLocation();
  const { id, label, kcal, fat, protein, carbs, serving } = location.state;
  console.log(id, label, kcal, fat, protein, carbs, serving)

  const [nutritionValues, setNutritionValues] = useState({
   foodServing: serving ? serving.quantity : 100,
   foodKcal: kcal,
   foodProtein: protein,
   foodFat: fat,
   foodCarbs: carbs,
  })

  const handleServingChange = (e) => {
    const newServing = e.target.value;
    console.log(newServing)
    setNutritionValues({
      ...nutritionValues,
     foodServing: newServing,
    });
    console.log(nutritionValues)
  };

  useEffect(() => {
    const { foodServing } = nutritionValues;
    const newKcal = kcal * (foodServing / 100);
    const newProtein = protein * (foodServing / 100);
    const newFat = fat * (foodServing / 100);
    const newCarbs = carbs * (foodServing / 100);

    setNutritionValues({
      ...nutritionValues,
      foodServing: foodServing,
      foodKcal: newKcal,
      foodProtein: newProtein,
      foodFat: newFat,
      foodCarbs: newCarbs,
    });
  }, [nutritionValues.foodServing]);

  const { foodServing, foodKcal, foodProtein, foodFat, foodCarbs } = nutritionValues;

  return (
    <form id={id}>
      <h4>{label}</h4>
      <input type="number" name="serving" value={foodServing} onChange={handleServingChange}/>
      <label htmlFor="serving">g</label>
      <p>Calories: {foodKcal} kcal</p>
      <p>P: {foodProtein}g</p>
      <p>F: {foodFat}g</p>
      <p>C: {foodCarbs}g</p>
      <button type="submit">Add</button>
    </form>
  )
}

// Form for editing values
//     <form id={id}>
//       <label htmlFor="title"> Description </label>
//       <input type="text" name="title" defaultValue={label}/>

//       <input type="number" name="serving" defaultValue={serving ? `${serving.quantity}` : 100}/>
//       <label htmlFor="serving">g</label>

//       <label htmlFor="notes"> Notes </label>
//       <input type="text" name="notes"/>

//       <label htmlFor="calories"> Calories(kcal) </label>
//       <input type="number" name="calories" defaultValue={kcal}/>
//       <label htmlFor="protein"> Protein(g) </label>
//       <input type="number" name="protein" defaultValue={protein}/>
//       <label htmlFor="fat"> Fat(g) </label>
//       <input type="number" name="fat" defaultValue={fat}/>
//       <label htmlFor="carbs"> carbs(g) </label>
//       <input type="number" name="carbs" defaultValue={carbs}/>
//       <button type="submit"> </button>
//     </form>
//     </>
//   )
// }

export default FoodAPIInfoAdd