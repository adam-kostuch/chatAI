import { styled, Container, Box, Typography, Button } from '@mui/material';
import * as React from 'react';
import { APPROX_BLUE, NEW_MIDNIGHT_BLUE } from '@chattie/colors';

const BannerContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'lelt',
  },
}));

const BannerContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  textAlign: 'left',
  maxWidth: 895,
  padding: '30px',
  marginTop: '170px',
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}));

const BannerTitle = styled(Typography)(() => ({
  lineHeight: 1,
  marginBottom: '20px',
  fontWeight: 350,
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: NEW_MIDNIGHT_BLUE,
  '&:hover': {
    backgroundColor: APPROX_BLUE,
    color: 'white',
  },
}));

const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  maxWidth: '456px',
  letterSpacing: 1.25,
  marginTop: '22px',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));

const Banner = () => {
  return (
    <BannerContainer maxWidth={false} className="banner-container full width">
      <BannerContent className="banner-content">
        <BannerTitle variant="h2">Chattie Friend</BannerTitle>
        <BannerDescription className="banner-desc" variant="subtitle2">
          Get in touch with people all around the world though chat. Robot
          Chattie helps you solving problems and gets you needed information.
        </BannerDescription>
      </BannerContent>
      <Box sx={{ padding: '30px' }}>
        <CustomButton variant="contained">Let’s start</CustomButton>
      </Box>
    </BannerContainer>
  );
};

export default Banner;
