import { Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import React from 'react';

const HomeNavbar = () => {
  return (
    <Box sx={{ position: 'absolute' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginLeft: '100px',
            marginTop: '50px',
            color: 'white',
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Chattie
        </Typography>
      </Link>
    </Box>
  );
};

export default HomeNavbar;
