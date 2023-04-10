import { styled, Container, Box, Typography } from '@mui/material';
import React from 'react';

const FooterContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  overflow: 'auto',
  color: 'white',
  backgroundColor: '#FF6700',
  position: 'relative',
  justifyContent: 'center',
  width: '100%',
  height: '20vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: 895,
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}));

const FooterEndLine = styled(Box)(() => ({
  alignItems: 'center',
  textAlign: 'center',
}));

const Footer = () => {
  return (
    <FooterContainer
      maxWidth={false}
      disableGutters
      className="container full-width"
    >
      <FooterContent className="footer-content">
        <FooterEndLine className="footer-end-items">
          <Typography>Copyright © 2023 Chattie</Typography>
          <Typography>Created by Kinga Kuś & Adam Kostuch</Typography>
        </FooterEndLine>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
