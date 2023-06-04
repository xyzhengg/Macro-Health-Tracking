import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const FoodAPIResultsDisplay = ({ id, label, kcal, fat, protein, carbs, serving}) => {

  const navigate = useNavigate()

  const showFoodDetails = async (e) => {
    const id = e.currentTarget.parentNode.id
    console.log(id)
    const food = {
      id: id,
      label: label,
      kcal: kcal,
      fat: fat,
      protein: protein,
      carbs: carbs,
      serving: serving
    }
    navigate(`/apifood/${id}`, { state: food })
  }
  return (
    <div id={id} >
      <h4> {label} </h4>
      <p>Serving: {serving ? `${serving.quantity}g` : '100g'}</p>
      <p>Calories: {kcal.toFixed(0)} kcal</p>
      <p>F: {fat.toFixed(1)}g</p>
      <p>P: {protein.toFixed(1)}g</p>
      <p>C: {carbs.toFixed(1)}g</p>
      <button onClick={showFoodDetails}> Select </button>
    </div>
  )
}
export default FoodAPIResultsDisplay