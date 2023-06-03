const RecipeResultsList = ({ id, title, image, totalCalories, fat, protein, carbs, diet, allergies, servings }) => {
  const caloriesPerServe = parseFloat(totalCalories/servings).toFixed(2)
  const allergyConsiderations =[
    "dairy-free",
    "egg-free",
    "gluten-free",
    "peanut-free",
    "shellfish-free",
    "crustacean-free",
    "soy-free",
    "sesame-free",
    "wheat-free",
    "fish-free",
    "lupine-free",
    "tree-nut-free",
    "celery-free",
    "mustard-free"
  ]

  const dietConsiderations = [
    "low-carb",
    "low-fat",
    "high-protein",
    "balanced",
    "high-fiber",
    "low-sodium",
    "paleo",
    "pescatarian",
    "vegan",
    "vegetarian",
    "pork-free"
  ]

  const filteredAllergies = allergies.filter((allergen) => allergyConsiderations.includes(allergen.toLowerCase()))
  const filteredDiets = diet.filter((dietItem) => dietConsiderations.includes(dietItem.toLowerCase()))


  return (
    <div id={id}>
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

export default RecipeResultsList