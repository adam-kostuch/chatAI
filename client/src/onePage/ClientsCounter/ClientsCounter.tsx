import * as React from 'react'
import { styled, Box, Container, Typography } from '@mui/material'

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  backgroundColor: '#FF6700',
  // position: 'relative',
  // justifyContent: 'center',
  width: '100%',
  height: '28vh',
  // marginTop: '200px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const CustomContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  textAlign: 'left',
  maxWidth: 700,
  marginLeft: '100px',
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}))

const ClientsCounter = () => {
  return (
    <CustomContainer maxWidth={false} disableGutters className='container full-width'>
      <CustomContent className='content'>
        <Typography sx={{ fontSize: '64px', color: 'black' }}>100+ Clients </Typography>
        <Typography>Various clients around the world who have used Chattie! </Typography>
      </CustomContent>
    </CustomContainer>
  )
}

export default ClientsCounter
