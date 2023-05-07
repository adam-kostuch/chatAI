import * as React from 'react';
import {
  styled,
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
  Rating,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import OpinionsData from './OpinionsData';

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '64px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
  },
}));

const CustomCard = styled(Paper)(() => ({
  maxWidth: '715px',
  maxHeight: '180px',
  textAlign: 'left',
}));

const ClientsOpinions = () => {
  const value = 4;

  return (
    <CustomContainer
      maxWidth={false}
      disableGutters
      className="full-width container"
    >
      <Grid container sx={{ margin: 5 }}>
        <Grid
          item
          xs={4}
          sx={{ paddingLeft: '80px', paddingTop: '120px', maxWidth: '420px' }}
        >
          <CustomTitle className="custom-title reviews">Reviews</CustomTitle>
          <Typography className="reviews-desc">
            Taking care of our clients is number one priority
          </Typography>
        </Grid>
        <Grid className="" item xs={8}>
          <Stack
            spacing={2}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {OpinionsData.map((data) => (
              <CustomCard
                className="custom-card opinions"
                key="card"
                sx={{ backgroundColor: 'black', color: 'white' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '27px',
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'orange' }}>
                      {data.personAvatarInitial}
                    </Avatar>
                    <Typography sx={{ marginLeft: '40px' }}>
                      {data.personName}
                    </Typography>
                  </Box>
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    emptyIcon={
                      <StarBorderIcon
                        fontSize="inherit"
                        className="empty-star icon"
                        sx={{ color: 'grey' }}
                      />
                    }
                  />
                </Box>
                <Typography sx={{ marginBottom: '60px' }}>
                  {data.description}
                </Typography>
              </CustomCard>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default ClientsOpinions;
