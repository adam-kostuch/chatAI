import * as React from 'react';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import NavbarData from './NavbarData';
import CustomButton from '../../CustomButton';
import { MIDNIGHT_BLACK, VANILLA_WHITE, BLAZE_ORANGE } from '@chattie/colors';

const MenuNavbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ mt: 2, mr: '5%', width: '90%', borderRadius: '10px' }}
    >
      <Toolbar sx={{ bgcolor: BLAZE_ORANGE, borderRadius: '10px' }}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="header menu-navbar"
        >
          <Button href="/#" variant="text" sx={{ color: VANILLA_WHITE }}>
            <Typography variant="h6" sx={{ fontWeight: '700' }}>
              CHATTIE
            </Typography>
          </Button>
          <Box component="ul" display="flex" p={0} gap={6}>
            {NavbarData.map(({ title }, idx) => (
              <Button
                key={`${title}-${idx}`}
                sx={{ color: VANILLA_WHITE, fontSize: '1rem' }}
              >
                {title}
              </Button>
            ))}
          </Box>
          <Stack direction="row" gap={2}>
            <CustomButton
              backgroundColor={BLAZE_ORANGE}
              color={VANILLA_WHITE}
              buttonLabel="SIGN IN"
            />
            <CustomButton
              backgroundColor={MIDNIGHT_BLACK}
              color={BLAZE_ORANGE}
              buttonLabel="SIGN UP"
            />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuNavbar;
