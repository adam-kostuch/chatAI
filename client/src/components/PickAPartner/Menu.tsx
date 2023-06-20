import { FC } from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { RedirectButton } from 'src/shared/components';
import { WOODSMOKE } from '@chattie/colors';

const Menu: FC = () => (
  <>
    <CssBaseline />
    <AppBar component="nav" color="transparent" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color={WOODSMOKE}
          fontWeight="bold"
          sx={{ flexGrow: 1 }}
        >
          Chattie
        </Typography>
        <RedirectButton buttonLabel="Log Out" />
      </Toolbar>
    </AppBar>
  </>
);

export default Menu;
