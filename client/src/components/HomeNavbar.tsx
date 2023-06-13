import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { GRAYISH_BLUE } from '@chattie/colors';

const HomeNavbar: FC = () => (
  <Box position="absolute">
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography
        variant="body1"
        component="div"
        ml="50px"
        mt="50px"
        sx={{
          color: GRAYISH_BLUE,
          flexGrow: 1,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        Chattie
      </Typography>
    </Link>
  </Box>
);

export default HomeNavbar;
