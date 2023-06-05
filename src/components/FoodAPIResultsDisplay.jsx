import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Box } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FoodAPIResultsDisplay = ({ id, label, kcal, fat, protein, carbs, serving}) => {

  const navigate = useNavigate()

  const showFoodDetails = () => {
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
    <CardContent id={id} sx={{ margin: '15px', paddingBottom: 0, border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: 180}}>
      <Typography variant="h6" component="div"> {label} </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Serving: {serving ? `${serving.quantity}g` : '100g'} </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Calories: {kcal.toFixed(0)} kcal </Typography>
      <Typography variant="body2">F: {fat.toFixed(1)}g </Typography>
      <Typography variant="body2">P: {protein.toFixed(1)}g </Typography>
      <Typography variant="body2">C: {carbs.toFixed(1)}g </Typography>
      <Button size="small" onClick={showFoodDetails} sx={{ padding:'0px'}}>Select</Button>
    </CardContent>

  )
}
export default FoodAPIResultsDisplay

