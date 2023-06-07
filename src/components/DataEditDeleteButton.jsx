import { MenuItem , Menu, IconButton } from '@mui/material';
import { MoreVert, Edit, DeleteForever  } from '@mui/icons-material';
import { useState } from 'react';

const DataEditDeleteButton = () => {
  const [onDisplay, setOnDisplay] = useState(null)
  const open = Boolean(onDisplay)
  const handleClick = (e) => {
    setOnDisplay(e.currentTarget)
  }
  
  const handleClose = () => {
    setOnDisplay(null)
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
        <MenuItem onClick={handleClose} variant="soft" sx={{color: `rgb(207, 27, 27)`}}>
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