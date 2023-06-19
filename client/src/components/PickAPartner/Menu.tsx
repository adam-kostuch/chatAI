import { FC } from 'react';
import RedirectButton from '../../shared/components/RedirectButton';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Flex } from 'src/shared/components';
import { VANILLA_WHITE, LIGHT_GRAYISH_BLUE, WOODSMOKE } from '@chattie/colors';

const Menu: FC = () => (
  <Flex>
    <AppBar component="nav" color="transparent" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: VANILLA_WHITE,
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Chattie
        </Typography>
        <Flex ml={10}>
          <RedirectButton
            borderColor={LIGHT_GRAYISH_BLUE}
            color={WOODSMOKE}
            buttonLabel="Log Out"
          />
        </Flex>
      </Toolbar>
    </AppBar>
  </Flex>
);

export default Menu;
