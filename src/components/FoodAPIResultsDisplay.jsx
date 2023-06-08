import { Routes, Route, useNavigate, useParams } from "react-router-dom";
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
    navigate(`/api/food/${id}`, { state: food })
  }
  return (
    <CardContent id={id} sx={{ margin: '15px', paddingBottom: 0, border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: 200}}>
      <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {label} </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Serving: {serving ? `${Math.round(serving.quantity)}g` : '100g'} </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Calories: {kcal.toFixed(0)} kcal </Typography>
      <Typography variant="body2">F: {fat.toFixed(1)}g </Typography>
      <Typography variant="body2">P: {protein.toFixed(1)}g </Typography>
      <Typography variant="body2">C: {carbs.toFixed(1)}g </Typography>
      <Button size="small" fullWidth onClick={showFoodDetails}
        sx={{ padding:'0px', marginTop: "20px",
        backgroundColor: `rgb(196, 155, 178)`, 
        color: `rgb(255,255,255)`, 
        '&:hover': {
        backgroundColor: `rgb(196, 155, 178)`, 
        color: `rgb(255,255,255)`}}}
        > Select
      </Button>
    </CardContent>
  )
}
export default FoodAPIResultsDisplay


