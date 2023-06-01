const FoodResultsDisplay = ({ label, kcal, fat, protein, carbs}) => {
  return (
    <div>
      <h4> {label} </h4>
      <p>Energy: {kcal.toFixed(0)} kcal</p>
      <p>F: {fat.toFixed(1)}g</p>
      <p>P: {protein.toFixed(1)}g</p>
      <p>C: {carbs.toFixed(1)}g</p>
    </div>
  )
}
export default FoodResultsDisplay