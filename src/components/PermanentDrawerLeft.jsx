import { styled, Grid, Typography, Drawer, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { supabase } from '../supabaseAuth/supabaseClient';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useDate } from '../contexts/DateProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const drawerWidth = 250

const PermanentDrawerLeft = () => {
  const navigate = useNavigate()
  const routes = ['/api/recipes/search', '/statistics', '/profile'];
  const icons = [<MenuBookIcon sx={{color:'#e7e7ec'}}/>, <BarChartIcon sx={{color:'#e7e7ec'}}/>, <SettingsIcon sx={{color:'#e7e7ec'}}/> ]
  const { setUser } = useAuth()
  const { setDate } = useDate()

  const [error, setError] = useState(null)
  const handleLogout = async () => {
    try {
      const { data, error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
        console.log(error)
      } else {
        setUser(null)
        localStorage.removeItem("authSession")
        navigate("/login")
      }
    }
    catch (err) {
      setError(err.message)
      console.log(err.message)
    }
    const { data, error } = await supabase.auth.getSession()
    localStorage.removeItem("authSession")
    console.log(data)
  }

  const handleClickToday = () => {
    setDate(new Date())
    navigate('/')
  }

  const handleClickProfile = () => {
    navigate('/profile')
  }

  return (
    <Grid container direction="column">
      <Drawer sx={{ alignItems: 'center',
        justifyContent: 'center', width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#3c274a' }}}
        variant="permanent"
        anchor="left" >
      <Grid container direction="row" justifyContent="center" alignItems="center" onClick={handleClickProfile}
        sx={{padding: 4, '&:hover': { backgroundColor: 'rgb(155, 101, 141)'}, height: '100px', backgroundColor: 'rgb(38, 23, 51)'}}>
        <AccountCircleIcon sx={{ color: '#e7e7ec', marginRight: 2 }} />
        <Typography variant="h5" sx={{ color: '#e7e7ec' }}> Profile </Typography>
      </Grid>
      <List>
        <ListItem disablePadding onClick={handleClickToday}>
          <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgb(155, 101, 141)' } }}>
            <ListItemIcon sx={{ marginLeft: '30px' }}>
              <CalendarTodayIcon sx={{ color: '#e7e7ec' }} />
            </ListItemIcon>
            <ListItemText primary="Today" sx={{color: 'white', paddingLeft: '0px'}}/>
          </ListItemButton>
        </ListItem>
        {['Recipes', 'Statistics', 'Settings'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={routes[index]} sx={{ '&:hover': { backgroundColor: 'rgb(155, 101, 141)' } }}>
            <ListItemIcon sx={{ marginLeft: '30px' }}>
              {icons[index]}
            </ListItemIcon>
            <ListItemText primary={text} sx={{color: 'white', paddingLeft: '0px'}}/>
          </ListItemButton>
        </ListItem>
        ))}
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgb(155, 101, 141)' } }}>
            <ListItemIcon sx={{ marginLeft: '30px' }}>
              <LogoutIcon sx={{ color: '#e7e7ec' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{color: 'white', paddingLeft: '0px'}}/>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  </Grid>
  )
}

export default PermanentDrawerLeft