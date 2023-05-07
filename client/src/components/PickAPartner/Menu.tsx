import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../CustomButton';

const Menu = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'black',
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Chattie
          </Typography>
          <Box sx={{ display: 'flex', marginLeft: '80px' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <CustomButton
                backgroundColor="black"
                color="#FF9147"
                buttonText="LOG OUT"
              />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;
