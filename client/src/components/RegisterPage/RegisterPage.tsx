import { useState, useEffect, FC } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { useChattieContext } from '../../ChattieContext';
import { Link } from 'react-router-dom';
import {
  styled,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useCheckAuthentication } from 'src/hooks';
import { addDoc, collection } from 'firebase/firestore';
import {
  APPROX_BLUE,
  VANILLA_WHITE,
  WOODSMOKE,
  GUN_POWDER,
  DARK_GRAYISH_BLUE,
} from '@chattie/colors';
import { LIGHT_GRAYISH_BLUE } from '@chattie/colors';

const CustomBorderTextField = styled(TextField)({
  '& .css-l4u8b9-MuiInputBase-root-MuiInput-root:before': {
    borderBottom: ' 1px solid ${DARK_GRAYISH_BLUE}',
  },
  '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': {
    color: GUN_POWDER,
  },
  '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
    color: APPROX_BLUE,
  },
  '& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
    color: APPROX_BLUE,
  },
  '& .css-l4u8b9-MuiInputBase-root-MuiInput-root:after': {
    borderBottom: `1px solid ${APPROX_BLUE}`,
  },
  '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
    color: APPROX_BLUE,
  },
});

const CustomLoadingButton = styled(LoadingButton)({
  marginTop: '24px',
  marginBottom: '16px',
  backgroundColor: 'white',
  color: WOODSMOKE,
  '&:hover': {
    backgroundColor: APPROX_BLUE,
    color: 'white',
  },
  '&:disabled': {
    backgroundColor: VANILLA_WHITE,
    opacity: 0.5,
    color: 'white',
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
        throw new Error(`Error creating user ${error}`);
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
      <Grid
        container
        className="grid-register full-width"
        sx={{ height: '100vh', width: '100%' }}
      >
        <Box
          className="text"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left',
            color: 'white',
          }}
        >
          <Typography component="h1" variant="h2" sx={{ color: APPROX_BLUE }}>
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
                  variant="standard"
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
                  variant="standard"
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
                  variant="standard"
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
              <Grid item xs={12} sx={{ color: LIGHT_GRAYISH_BLUE }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      onChange={() => {
                        setPolicyTerms((prevValue) => !prevValue);
                      }}
                      sx={{
                        color: LIGHT_GRAYISH_BLUE,
                        '&.Mui-checked': {
                          color: DARK_GRAYISH_BLUE,
                        },
                      }}
                    />
                  }
                  label="I’ve read and agreed to Terms & Conditions"
                />
              </Grid>
            </Grid>
            <CustomLoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              disabled={
                Object.keys(formik.values).length === 0 ||
                Object.keys(formik.errors).length !== 0 ||
                !policyTerms
              }
            >
              CREATE AN ACCOUNT
            </CustomLoadingButton>
            <Grid
              container
              className="grid sign-in-link"
              sx={{
                display: 'flex',
                color: DARK_GRAYISH_BLUE,
                gap: '20px',
              }}
            >
              <Typography>Already have an account? &nbsp;</Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: APPROX_BLUE }}>Sign In</Typography>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default RegisterPage;
