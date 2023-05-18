import React, { FC, useCallback } from 'react';
import { Box, Container, Fab, Fade, useScrollTrigger } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { WOODSMOKE } from '@chattie/colors';

// components
import Banner from './Banner';
import AboutUs from './AboutUs/AboutUs';
import MenuNavbar from './Navbar/MenuNavbar';
import ClientsCounter from './ClientsCounter/ClientsCounter';
import ClientsOpinions from './ClientsOpinions/ClientsOpinions';
import Footer from './Footer/Footer';

const OnePage: FC = () => (
  <Container maxWidth={false} sx={{ backgroundColor: WOODSMOKE }}>
    <MenuNavbar />
    <Banner />
    <AboutUs />
    <ClientsCounter />
    <ClientsOpinions />
    <Footer />
    <BackToTop />
  </Container>
);

export default OnePage;

const BackToTop: FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Fade in={trigger}>
      <Box
        onClick={scrollToTop}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="small">
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
};
