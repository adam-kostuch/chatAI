import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled, Container, Box, Typography, Grid } from '@mui/material';
import Menu from './Menu';
// import RealPartner from '../../assets/HyperspaceFloating.png';
// import RobotPartner from '../../assets/HyperspaceRobot1.png';
import RealPartner from '../../assets/real_people.png';
import RobotPartner from '../../assets/vecteezy_robot-chatbot.png';
import { useCheckAuthentication } from 'src/hooks';
import { WOODSMOKE, VANILLA_WHITE } from '@chattie/colors';
import './PickAPartner.css';

const ChatPartnerData = [
  {
    name: 'A.I. Robot',
    image: RobotPartner,
    alt: 'image of robot partner',
    path: '/chat#robot',
  },
  {
    name: 'Real Person',
    image: RealPartner,
    alt: 'image of real partner',
    path: '/chat#realtime',
  },
];

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PickAPartner: FC = () => {
  useCheckAuthentication();

  return (
    <>
      <Menu />
      <Container
        maxWidth={false}
        sx={{
          color: VANILLA_WHITE,
          justifyContent: 'center',
          display: 'flex',
          textAlign: 'center',
          backgroundColor: WOODSMOKE,
        }}
      >
        <Box sx={{ position: 'absolute', paddingTop: '100px' }}>
          <Typography variant="h3">Choose Your Chatter!</Typography>
        </Box>
        <CustomContainer
          maxWidth={false}
          disableGutters
          className="full-width container"
        >
          <Grid
            container
            sx={{
              justifyContent: 'center',
              display: 'flex',
              marginTop: '100px',
            }}
          >
            {ChatPartnerData.map((partner) => (
              <Grid item className="example-container" p={20} key="grid">
                <Link to={partner.path} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <img
                      src={partner.image}
                      alt={partner.alt}
                      style={{ width: '450px', height: '450px' }}
                    />
                  </motion.div>
                  <Typography variant="h5" color={VANILLA_WHITE} pt={15}>
                    {partner.name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </CustomContainer>
      </Container>
    </>
  );
};

export default PickAPartner;
