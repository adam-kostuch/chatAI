import React, { FC, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useChattieContext } from '../../ChattieContext';

import {
  styled,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

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

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginPage: FC = () => {
  const { auth, apiClient } = useChattieContext();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idToken, setIdToken] = useState('');
  const [submit, setSubmit] = useState(false);

  const { isLoading, isSuccess } = useQuery(
    ['login', { email, password }],
    async () => await apiClient.login(idToken),
    {
      enabled: submit,
      retry: false,
    }
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setEmail(values.email);
      setPassword(values.password);
      setSubmit(true);

      await signInWithEmailAndPassword(auth, email, password).then(
        ({ user }: any) => {
          console.log({ user });
          return user.getIdToken().then(async (idToken: any) => {
            setIdToken(idToken);

            return idToken;
          });
        }
      );
    },
  });

  console.log(formik.values);

  useEffect(() => {
    if (isSuccess && idToken !== '') {
      window.localStorage.setItem('cookie', JSON.stringify(idToken));
      window.location.href = '/chat-partner';
    }
  }, [isSuccess]);

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
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomBorderTextField
                      autoComplete="email"
                      name="email"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      autoFocus
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <Box color="red" fontSize={14} pl={2}>
                        {formik.errors.email}
                      </Box>
                    )}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Box color="red" fontSize={14} pl={2}>
                        {formik.errors.password}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
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
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  disabled={
                    Object.keys(formik.values).length === 0 ||
                    Object.keys(formik.errors).length !== 0
                  }
                  sx={{
                    backgroundColor: '#FF6700',
                    ':hover': {
                      bgcolor: 'black',
                      color: 'white',
                    },
                  }}
                >
                  SIGN IN
                </LoadingButton>
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
                    Forgot your password?
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
