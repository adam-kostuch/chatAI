import { Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import React from 'react';

const HomeNavbar = () => {
  return (
    <Box position="absolute">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          variant="h6"
          component="div"
          ml="100px"
          mt="50px"
          sx={{
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
