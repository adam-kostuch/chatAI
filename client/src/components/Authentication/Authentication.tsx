import { FC, ReactNode } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useCheckAuthentication } from 'src/hooks';
import { WOODSMOKE, VANILLA_WHITE } from '@chattie/colors';
import AI_image from '../../assets/ArtificialIntelligence.png';
import HomeNavbar from '../HomeNavbar';

const Authentication: FC<{ form: ReactNode }> = ({ form }) => {
  useCheckAuthentication();

  return (
    <>
      <Grid container className="login full-width" sx={{ height: '100vh' }}>
        <HomeNavbar />
        <Grid
          item
          className="animated-images container"
          sx={{
            backgroundColor: WOODSMOKE,
            borderRadius: '0 20px 20px 0',
            width: '40%',
            color: VANILLA_WHITE,
          }}
        >
          <Typography
            sx={{
              marginTop: '110px',
              marginLeft: '50px',
              fontSize: '28px',
              width: '400px',
            }}
          >
            Find new connections and have fun!
          </Typography>
          <img src={AI_image} alt="" />
        </Grid>
        <Container
          maxWidth={false}
          component="main"
          className="containter-text"
          sx={{
            backgroundColor: VANILLA_WHITE,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            heigth: '100%',
            width: '60%',
            position: 'relative',
            margin: 0,
          }}
        >
          <Box
            className="text"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              rowGap: '2.5rem',
              textAlign: 'left',
              width: '30rem',
            }}
          >
            {form}
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default Authentication;
