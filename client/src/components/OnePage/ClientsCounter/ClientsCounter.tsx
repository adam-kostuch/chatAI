import { FC } from 'react';
import { styled, Box, Container, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { APPROX_BLUE } from '@chattie/colors';

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  justifyContent: 'center',
  itemsAlign: 'center',
  width: '100%',
  height: '40vh',
  marginTop: '150px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CustomContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: 700,
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}));

const ClientsCounter: FC = () => {
  return (
    <CustomContainer
      maxWidth={false}
      disableGutters
      className="container full-width"
    >
      <CustomContent className="content">
        <SmartToyIcon sx={{ color: APPROX_BLUE, fontSize: '80px' }} />
        <Typography sx={{ fontSize: '64px', color: APPROX_BLUE }}>
          100+ Clients{' '}
        </Typography>
        <Typography>
          Various clients around the world who have used Chattie!{' '}
        </Typography>
      </CustomContent>
    </CustomContainer>
  );
};

export default ClientsCounter;
