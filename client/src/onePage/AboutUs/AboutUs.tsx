import React from 'react'
import { styled, Container, Box, Typography } from '@mui/material'

import './AboutUs.css'

const AboutUsContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  overflow: 'auto',
  color: 'white',
  position: 'relative',
  justifyContent: 'center',
  width: '100%',
  height: '200vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const AboutUsContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  // position: 'absolute',
  flexDirection: 'column',
  // justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: 895,
  padding: '30px',
  marginTop: '400px',
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}))

const BotDesc = ['innovative bot', 'using advanced', 'AI technology']

const AboutUs = () => {
  return (
    <AboutUsContainer className='main' maxWidth={false} disableGutters>
      <AboutUsContent>
        {BotDesc.map((desc) => (
          <Typography className='text' key={desc} sx={{ fontSize: '96px' }}>
            {desc}
          </Typography>
        ))}
      </AboutUsContent>
    </AboutUsContainer>
  )
}

export default AboutUs
