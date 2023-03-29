import * as React from 'react'
// import { Link } from 'react-router-dom'
import {
  // styled,
  AppBar,
  Box,
  Toolbar,
  Typography,
  // ListItem,
  Button,
  CssBaseline,
  // Drawer,
  IconButton,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import NavbarData from './NavbarData'
import CustomLink from './CustomLink'
import CustomButton from '../CustomButton'

// const NavbarLink = styled(Link)({
//   color: 'white',
//   textAlign: 'center',
//   textDecoration: 'none',
//   padding: '0.5rem 1rem',
//   '&:hover': {
//     backgroundColor: '#6d76f7',
//     borderRadius: '4px',
//     transition: 'all 0.2s ease-out',
//   },
// })

const MenuNavbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' color='transparent' elevation={0}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ color: 'white', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Chattie
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {NavbarData.map((item) => (
              <CustomLink key={item.title} color='#fff' lineColor='#FF9147' linkText={item.title} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', marginLeft: '80px', color: 'white' }}>
            <Button sx={{ color: '#fff' }}>SIGN IN</Button>
            <CustomButton backgroundColor='#FF9147' color='#fff' buttonText='SIGN UP' />
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box> */}
    </Box>
  )
}

export default MenuNavbar
