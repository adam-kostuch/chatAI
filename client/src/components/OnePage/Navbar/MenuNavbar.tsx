import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import NavbarData from './NavbarData';
import CustomLink from './CustomLink';
import CustomButton from '../../CustomButton';
import LoginPage from '../../LoginPage/LoginPage';
import RegisterPage from '../../RegisterPage/RegisterPage';

const MenuNavbar = () => {
  return (
    <>
      <Box
        sx={{
          display: 'block',
          maxWidth: '1200px',
          left: 0,
          right: 0,
          position: 'fixed',
          color: 'white',
          padding: '20px',
          margin: '0 112px 0 112px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FF6700',
            height: '80px',
            borderRadius: '15px',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: 'center',
          }}
        >
          <Box
            className="header"
            sx={{
              justifyContent: 'space-between',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px 0 20px',
            }}
          >
            <p>CHATTIE</p>
            <ul
              style={{
                display: 'flex',
                columnGap: '30px',
              }}
            >
              {NavbarData.map((item) => (
                <CustomLink
                  key={item.title}
                  color="#fff"
                  linkText={item.title}
                />
              ))}
            </ul>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <CustomButton
                backgroundColor="black"
                color="#FF6700"
                buttonText="SIGN UP"
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default MenuNavbar;
