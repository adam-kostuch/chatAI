import * as React from 'react';
import { Container } from '@mui/material';

// components
import Banner from './Banner';
import AboutUs from './AboutUs/AboutUs';
import MenuNavbar from './Navbar/MenuNavbar';
import ClientsCounter from './ClientsCounter/ClientsCounter';
import ClientsOpinions from './ClientsOpinions/ClientsOpinions';
import Footer from './Footer/Footer';

const OnePage = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: 'black' }}
    >
      <MenuNavbar />
      <Banner />
      <AboutUs />
      <ClientsCounter />
      <ClientsOpinions />
      <Footer />
    </Container>
  );
};

export default OnePage;
