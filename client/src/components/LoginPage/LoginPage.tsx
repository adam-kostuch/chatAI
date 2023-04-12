import * as React from 'react';

import {
  styled,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Link } from 'react-router-dom';

import HomeNavbar from '../HomeNavbar';

import backgroundRobot from '../../assets/backgroundRobot.png';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '70%',
  maxHeight: '80%',
});

const CustomBorderTextField = styled(TextField)({
  '& label': {
    '&.Mui-focused': {
      color: 'black',
    },
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

const LoginPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <HomeNavbar />
      <Grid
        container
        className="grid-login full-width"
        sx={{ height: '100vh' }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundColor: 'black',
          }}
        >
          <Box
            sx={{
              maxWidth: '480px',
              maxHeight: '171px',
              marginLeft: '100px',
              marginTop: '100px',
              color: 'white',
            }}
          >
            <Typography variant="h4">Welcome!</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Img alt="image" src={backgroundRobot} />
        </Grid>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
            }}
          >
            <Typography component="h1" variant="h2" sx={{ color: '#FF6700' }}>
              Log In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid
                container
                className="grid sign-in-link"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Box>
                  <Typography>Don’t have an account?</Typography>
                  <Typography>It will take less than a minute.</Typography>
                </Box>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleClose}
                    disableRipple
                    disableFocusRipple
                    sx={{
                      color: '#FF6700',
                      '&:hover': {
                        backgroundColor: 'rgb(255, 103, 0, 0.05)',
                      },
                    }}
                  >
                    Create an account
                  </Button>
                </Link>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomBorderTextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomBorderTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        sx={{
                          color: 'black',
                          '&.Mui-checked': {
                            color: '#FF6700',
                          },
                        }}
                      />
                    }
                    label="I’ve read and aggre to Terms & Conditions"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                className="grid sign-in-link"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 3,
                  mb: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF6700',
                    ':hover': {
                      bgcolor: 'black',
                      color: 'white',
                    },
                  }}
                >
                  SIGN IN
                </Button>
                <div>
                  <Button
                    disableRipple
                    disableFocusRipple
                    onClick={handleOpen}
                    sx={{
                      color: '#FF6700',
                      '&:hover': { backgroundColor: 'rgb(255, 103, 0, 0.05)' },
                    }}
                  >
                    Forget your password?
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    sx={{
                      '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                          width: '100%',
                          maxWidth: '500px',
                        },
                      },
                    }}
                  >
                    <DialogTitle>Forget your password?</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        We’ll email you a link to resset your password.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        sx={{
                          '& label': {
                            '&.Mui-focused': {
                              color: 'black',
                            },
                          },
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: 'black',
                            },
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: 'black',
                          },
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        disableRipple
                        disableFocusRipple
                        sx={{
                          color: '#FF6700',
                          '&:hover': {
                            backgroundColor: 'rgb(255, 103, 0, 0.05)',
                          },
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleClose}
                        disableRipple
                        disableFocusRipple
                        sx={{
                          backgroundColor: '#FF6700',
                          ':hover': {
                            bgcolor: 'black',
                            color: 'white',
                          },
                        }}
                      >
                        Send me a password reset link
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default LoginPage;
