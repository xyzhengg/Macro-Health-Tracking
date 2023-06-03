const RecipeInfo = () => {

  return (
    <div>
      <h4> {title} </h4>
      <img src={image} alt={`image of ${title}`}/>
      <p> Calories/serve: {caloriesPerServe}kcal </p>
      <p> Servings: {servings}</p>
      <p> F: {fat} </p>
      <p> P: {protein} </p>
      <p> C: {carbs} </p> 
      { filteredDiets && (
        <>
          <h4> Diet Considerations </h4>
          {filteredDiets.map((diet) => (<p> {diet} </p>))}
        </>
      )}
      
      { filteredAllergies && (
        <>
          <h4> Allergy Considerations </h4>
          {filteredAllergies.map((allergen) => (<p> {allergen} </p>))}
        </>
      )}
      
      <button> + Add </button>

    </div>
  )
}

export default RecipeInfo