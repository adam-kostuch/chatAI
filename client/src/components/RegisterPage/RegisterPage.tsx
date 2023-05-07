import React, { useState, useEffect, FC } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { useChattieContext } from '../../ChattieContext';
import { Link } from 'react-router-dom';

import {
  styled,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import HomeNavbar from '../HomeNavbar';

import image1 from '../../assets/image.png';
import { addDoc, collection } from 'firebase/firestore';
import useCheckAuthentication from 'src/hooks/useCheckAuthentication';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '80%',
  maxHeight: '100%',
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

const SignupSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be at least 8 characters')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Password must contain at least one big character, one small, a number and a special sign'
    ),
});

const RegisterPage: FC = () => {
  useCheckAuthentication();

  const { apiClient, db } = useChattieContext();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [policyTerms, setPolicyTerms] = useState(false);

  const registrationProps = { displayName, email, password };

  const { isSuccess, isError, isLoading } = useQuery(
    ['register', registrationProps],
    async () => await apiClient.registration(registrationProps),
    {
      enabled: submit,
      retry: false,
    }
  );

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setDisplayName(values.username);
      setEmail(values.email);
      setPassword(values.password);

      try {
        const userRef = await addDoc(collection(db, 'users'), {
          displayName: values.username,
          email: values.email,
        });

        console.log('User written with ID: ', userRef.id);
        setSubmit(true);
      } catch (error) {
        console.error('Error creating user: ', error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/login';
    }
  }, [isSuccess]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isError}
        autoHideDuration={1000}
      >
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          User with given email address or username already exists!
        </Alert>
      </Snackbar>
      <HomeNavbar />
      <Grid
        container
        className="grid-register full-width"
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
          <Img alt="image" src={image1} />
          <Box
            sx={{
              maxWidth: '480px',
              maxHeight: '171px',
              marginLeft: '100px',
              marginTop: '10px',
              color: 'white',
            }}
          >
            <Typography variant="h4">Welcome!</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
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
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomBorderTextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <Box color="red" fontSize={14} pl={2}>
                      {formik.errors.username}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CustomBorderTextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        onChange={() => {
                          setPolicyTerms((prevValue) => !prevValue);
                        }}
                        sx={{
                          color: 'black',
                          '&.Mui-checked': {
                            color: '#FF6700',
                          },
                        }}
                      />
                    }
                    label="I’ve read and agreed to Terms & Conditions"
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading}
                disabled={
                  Object.keys(formik.values).length === 0 ||
                  Object.keys(formik.errors).length !== 0 ||
                  !policyTerms
                }
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#FF6700',
                  ':hover': {
                    bgcolor: 'black',
                    color: 'white',
                  },
                }}
              >
                CREATE AN ACCOUNT
              </LoadingButton>
              <Grid
                container
                className="grid sign-in-link"
                sx={{ display: 'flex' }}
              >
                <Typography>Already have an account? &nbsp;</Typography>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: '#FF6700' }}>Sign in</Typography>
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default RegisterPage;
