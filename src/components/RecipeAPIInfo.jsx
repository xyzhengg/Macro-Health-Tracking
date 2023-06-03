import { Routes, Route, useNavigate, useParams } from "react-router-dom";

const RecipeAPIInfo = ({id, title, image, servings, fat, protein, carbs, calories, allergies, diets, ingredients, linkToDirections}) => {
  console.log(ingredients)
  const navigate = useNavigate()
  return (
    <>
      <button onClick={() => navigate(-1)}> Back </button>
      <div id={id}>
      <h4> {title} </h4>
      <img src={image} alt={`image of ${title}`}/>
      <p> Calories/serve: {calories}kcal </p>
      <p> Servings: {servings}</p>
      <p> F: {fat}g </p>
      <p> P: {protein}g </p>
      <p> C: {carbs}g </p> 
      {diets && (
        <>
          <h4> Diet Considerations </h4>
          {diets.map((diet) => (<p key={diet}> {diet} </p>))}
        </>
      )}
      
      {allergies && (
        <>
          <h4> Allergy Considerations </h4>
          {allergies.map((allergen) => (<p key={allergen}> {allergen} </p>))}
        </>
      )}

      <h4> Ingredients: </h4>
      {ingredients && ingredients.map((ingredient) => (
        <p key={ingredient.food}>
          <span> {ingredient.quantity} </span>
          {ingredient.measure !== '<unit>' && <span> {ingredient.measure} </span>}
          <span> {ingredient.food} </span>
          {ingredient.weight && <span> {`(${Math.round(ingredient.weight)}g)`} </span>}
        </p>
      ))}
      <h4> Directions: </h4>
      <a href={linkToDirections}> Click for directions </a>
      <br/>
      <button> + Add </button>
    </div>
    </>

  )
}

export default RecipeAPIInfo