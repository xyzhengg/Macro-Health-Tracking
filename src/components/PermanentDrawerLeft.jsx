import { Box } from '@mui/material'
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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

const drawerWidth = 250

const PermanentDrawerLeft = () => {
  const routes = ['/', '/apirecipesearch', '/statistics', '/settings', '/logout'];
  const icons = [<CalendarTodayIcon sx={{color:'#e7e7ec'}}/>, <MenuBookIcon sx={{color:'#e7e7ec'}}/>, <BarChartIcon sx={{color:'#e7e7ec'}}/>, <SettingsIcon sx={{color:'#e7e7ec'}}/>, <LogoutIcon sx={{color:'#e7e7ec'}}/> ]

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}> Hello
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Profile
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#3c274a'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {['Today', 'Recipes', 'Statistics', 'Settings', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={routes[index]}>
                <ListItemIcon sx={{ marginLeft: '30px'}}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{color: 'white', paddingLeft: '0px'}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default PermanentDrawerLeft