import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthProvider';
import { useMeal } from '../contexts/MealContext';
import { useDate } from '../contexts/DateProvider';
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import {Typography, Button, CardContent, Box} from '@mui/material';
import { AspectRatio } from "@mui/icons-material";
import axios from 'axios'
import { supabase } from "../supabaseAuth/supabaseClient"


const MyRecipesResultsList = ({ id, title, image, calories, fat, protein, carbs, servings, ingredients, handleClick, handleShowRecipeDetails }) => {

  return (
    <>
      <CardContent  sx={{ marginTop: 2, paddingBottom: 0, border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: 400}}>
        <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {title} </Typography>
        <Box minHeight="120px" maxHeight="200px" display="flex" alignItems="center" justifyContent="center">
          <img src={image} loading="lazy" alt={`image of ${title}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Calories/serve: {calories}kcal </Typography>
        <Typography variant="body2">F: {fat}g </Typography>
        <Typography variant="body2">C: {carbs}g </Typography>
        <Typography variant="body2">P: {protein}g </Typography>
        <Button id={id} size="small" fullWidth onClick={handleShowRecipeDetails}
          sx={{ padding:'0px', marginTop: "20px",
          backgroundColor: `rgb(175, 194, 214)`, 
          color: `rgb(255,255,255)`, 
          '&:hover': {
          backgroundColor: `rgb(175, 194, 214)`, 
          color: `rgb(255,255,255)`}}}
          > Show More
        </Button>
        <Button id={id} size="small" fullWidth onClick={handleClick}
          sx={{ padding:'0px', marginTop: "10px",
          backgroundColor: `rgb(154, 198, 199)`, 
          color: `rgb(255,255,255)`, 
          '&:hover': {
          backgroundColor: `rgb(154, 198, 199)`, 
          color: `rgb(255,255,255)`}}}
          > Select
        </Button>
      </CardContent>
    </>
  )
}

export default MyRecipesResultsList