const FoodResultsDisplay = ({ label, kcal, fat, protein, carbs, serving}) => {
  return (
    <div>
      <h4> {label} </h4>
      <p>Energy: {kcal.toFixed(0)} kcal</p>
      <p>F: {fat.toFixed(1)}g</p>
      <p>P: {protein.toFixed(1)}g</p>
      <p>C: {carbs.toFixed(1)}g</p>
      <p>Serving: {serving ? `${serving.quantity}g` : '100g'}</p>
    </div>
  )
}
export default FoodResultsDisplay