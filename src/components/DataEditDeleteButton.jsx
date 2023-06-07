import { supabase } from "../supabaseAuth/supabaseClient"
import { MenuItem , Menu, IconButton } from '@mui/material';
import { MoreVert, Edit, DeleteForever  } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from "../contexts/AuthProvider";
import { useMeal } from "../contexts/MealContext";
import { useNavigate } from "react-router-dom";
import { useDate } from "../contexts/DateProvider";

const DataEditDeleteButton = ( { id }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { meal } = useMeal()
  const { date, setDate } = useDate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [onDisplay, setOnDisplay] = useState(null)
  const open = Boolean(onDisplay)

  const handleClick = (e) => {
    setOnDisplay(e.currentTarget)
  }
  
  const handleClose = () => {
    setOnDisplay(null)
  }

  const handleDelete = async (e) => {
    console.log(date)
    handleClose()
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('diary')
        .delete()
        .eq('id', e.currentTarget.id)
      if (error) {
        console.log(error)
      } else {
        setLoading(false)
        setDate(new Date(date.getTime() + 10000))
        console.log(date)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <IconButton color="neutral" variant="plain" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={onDisplay} open={open} onClose={handleClose} placement="right-start">
        <MenuItem onClick={handleClose}>
          <IconButton>
            <Edit />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem id={id} onClick={handleDelete} variant="soft" sx={{color: `rgb(207, 27, 27)`}}>
          <IconButton sx={{ color: 'inherit' }}>
            <DeleteForever />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
export default DataEditDeleteButton