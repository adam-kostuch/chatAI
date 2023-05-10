import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import NavbarData from './NavbarData';
import CustomLink from './CustomLink';
import CustomButton from '../../CustomButton';

import LoginPage from '../../LoginPage/LoginPage';
import RegisterPage from '../../RegisterPage/RegisterPage';
import useCheckAuthentication from 'src/hooks/useCheckAuthentication';

const MenuNavbar = () => {
  const isAuthenticated = useCheckAuthentication();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'white',
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Chattie
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {NavbarData.map((item) => (
                <CustomLink
                  key={item.title}
                  color="#fff"
                  lineColor="#FF9147"
                  linkText={item.title}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', marginLeft: '80px', color: 'white' }}>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#fff' }}>SIGN IN</Button>
                  </Link>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <CustomButton
                      backgroundColor="#FF9147"
                      color="#fff"
                      buttonText="SIGN UP"
                    />
                  </Link>
                </>
              ) : (
                <CustomButton
                  backgroundColor="#FF9147"
                  color="#fff"
                  buttonText="LOG OUT"
                />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default MenuNavbar;
