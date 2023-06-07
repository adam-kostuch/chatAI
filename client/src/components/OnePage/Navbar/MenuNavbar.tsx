import { FC } from 'react';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import NavbarData from './NavbarData';
import CustomButton from '../../CustomButton';
import { WOODSMOKE, APPROX_BLUE, LIGHT_GRAYISH_BLUE } from '@chattie/colors';

const MenuNavbar: FC = () => (
  <AppBar
    position="fixed"
    sx={{ mt: 2, mr: '5%', width: '90%', borderRadius: '10px' }}
  >
    <Toolbar sx={{ bgcolor: LIGHT_GRAYISH_BLUE, borderRadius: '10px' }}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="header menu-navbar"
      >
        <Button href="/#" variant="text" sx={{ color: APPROX_BLUE }}>
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            CHATTIE
          </Typography>
        </Button>
        <Box component="ul" display="flex" p={0} gap={6}>
          {NavbarData.map(({ title }, idx) => (
            <Button
              key={`${title}-${idx}`}
              sx={{ color: WOODSMOKE, fontSize: '1rem' }}
            >
              {title}
            </Button>
          ))}
        </Box>
        <Stack direction="row" gap={2}>
          <CustomButton
            borderColor=""
            color={APPROX_BLUE}
            buttonLabel="Sign In"
          />
          <CustomButton
            borderColor={APPROX_BLUE}
            color={LIGHT_GRAYISH_BLUE}
            buttonLabel="Sign Up"
          />
        </Stack>
      </Box>
    </Toolbar>
  </AppBar>
);

export default MenuNavbar;
