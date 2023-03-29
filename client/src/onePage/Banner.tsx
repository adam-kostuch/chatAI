import { styled, Container, Box, Typography, Button } from '@mui/material'
import * as React from 'react'

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

import BacgroundCircles from '../assets/background.png'

const BannerContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const BannerImage = styled('img')(({ theme }) => ({
  marginTop: '60px',
  position: 'relative',
  width: '70%',
  height: '90%',
  [theme.breakpoints.down('md')]: {
    width: '650px',
    height: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '320px',
    height: '200px',
  },
}))

const BannerContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  position: 'absolute',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: 895,
  padding: '30px',
  marginTop: '200px',
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}))

const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '128px',
  marginBotton: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
  },
}))

const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  maxWidth: '456px',
  letterSpacing: 1.25,
  marginTop: '22px',
  marginBottom: '90px',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}))

const Banner = () => {
  // React.useEffect(() => {
  //   const t1 = gsap.timeline()
  //   t1.from('.banner-content', {
  //     y: 100,
  //     duration: 5,
  //     opacity: 0,
  //     ease: 'power4',
  //   })
  // })

  return (
    <BannerContainer maxWidth={false} disableGutters className='banner-container full width'>
      <BannerImage src={BacgroundCircles} />
      <BannerContent className='banner-content'>
        <Typography variant='h6'>I&apos;m waiting</Typography>
        <BannerTitle>Chattie Friend</BannerTitle>
        <BannerDescription className='banner-desc' variant='subtitle1'>
          Helping you and making new friends through chat easier
        </BannerDescription>
        <Button variant='contained' endIcon={<KeyboardDoubleArrowDownIcon />}>
          Scroll Down
        </Button>
      </BannerContent>
    </BannerContainer>
  )
}

export default Banner
