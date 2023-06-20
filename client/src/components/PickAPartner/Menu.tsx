import { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { RedirectButton, Typography } from 'src/shared/components';
import { WOODSMOKE } from '@chattie/colors';

const Menu: FC = () => (
  <AppBar component="nav" color="transparent" elevation={0}>
    <Toolbar>
      <Typography variant="h6" color={WOODSMOKE} sx={{ flexGrow: 1 }}>
        Chattie
      </Typography>
      <RedirectButton buttonLabel="Log Out" />
    </Toolbar>
  </AppBar>
);

export default Menu;
