import {Typography, Button, CardContent, Box} from '@mui/material';

const MyRecipesResultsList = ({ id, title, image, calories, fat, protein, carbs, servings, ingredients, handleClick, handleShowRecipeDetails }) => {

  const placeholderImage = '/foodimageplaceholder.jpg'
  const recipeImage = image ? image : placeholderImage
  const handleImageError = (e) => {
    e.target.src = placeholderImage
  }

  return (
    <>
      <CardContent sx={{ marginTop: 2, paddingBottom: 0, border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: 400 }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </Typography>
          <Box sx={{ width: '100%', height: 0, paddingTop: '100%', position: 'relative', overflow: 'hidden'}} >
            <img src={recipeImage} alt={`Image of ${title}`} onError={handleImageError}
              style={{position: 'absolute', top: 0,left: 0, width: '100%', height: '100%', objectFit: 'cover',}}
            />
          </Box>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Calories/serve: {calories}kcal
          </Typography>
          <Typography variant="body2">F: {fat}g</Typography>
          <Typography variant="body2">C: {carbs}g</Typography>
          <Typography variant="body2">P: {protein}g</Typography>
        </Box>
        <Box>
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
        </Box>
        
      </CardContent>
    </>
  )
}

export default MyRecipesResultsList