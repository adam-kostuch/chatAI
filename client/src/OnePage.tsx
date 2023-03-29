import * as React from 'react'
import { Container } from '@mui/material'

// components
import Banner from './onePage/Banner'
import AboutUs from './onePage/AboutUs/AboutUs'
import MenuNavbar from './onePage/Navbar/MenuNavbar'
import ClientsCounter from './onePage/ClientsCounter/ClientsCounter'
import ClientsOpinions from './onePage/ClientsOpinions/ClientsOpinions'

const OnePage = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ backgroundColor: 'black' }}>
      <MenuNavbar />
      <Banner />
      <AboutUs />
      <ClientsCounter />
      <ClientsOpinions />
    </Container>
  )
}

export default OnePage
