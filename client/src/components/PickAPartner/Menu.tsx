import { FC } from 'react';
import CustomButton from '../CustomButton';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Flex } from 'src/shared/components';
import { BLAZE_ORANGE } from '@chattie/colors';

const Menu: FC = () => (
  <Flex>
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
        <Flex ml={10}>
          <CustomButton
            borderColor="black"
            color={BLAZE_ORANGE}
            buttonLabel="Log Out"
          />
        </Flex>
      </Toolbar>
    </AppBar>
  </Flex>
);

export default Menu;
