import { FC, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useCookies } from 'react-cookie';
import { COOKIE_TOKEN } from '../../types';
import { useCheckAuthentication } from 'src/hooks';
import { BLAZE_ORANGE, WOODSMOKE, VANILLA_WHITE } from '@chattie/colors';

const CustomBorderTextField = styled(TextField)({
  '& .css-l4u8b9-MuiInputBase-root-MuiInput-root:before': {
    borderBottom: ' 1px solid white',
  },
  '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': {
    color: 'white',
  },
  '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
    color: 'white',
  },
  '& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
    color: 'white',
  },
  '& .css-l4u8b9-MuiInputBase-root-MuiInput-root:after': {
    borderBottom: `1px solid ${BLAZE_ORANGE}`,
  },
  '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
    color: 'white',
  },
});

const CustomLoadingButton = styled(LoadingButton)({
  backgroundColor: 'white',
  color: WOODSMOKE,
  '&:hover': {
    backgroundColor: BLAZE_ORANGE,
    color: 'white',
  },
  '&:disabled': {
    backgroundColor: VANILLA_WHITE,
    opacity: 0.5,
    color: 'white',
  },
});

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginPage: FC = () => {
  useCheckAuthentication();

  const { auth, apiClient } = useChattieContext();

  // HOC logic for sent reset password
  const [isError, setIsError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Cookies validation logic
  const [, setCookies] = useCookies([COOKIE_TOKEN]);

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

  const handleEmailSent = (value: boolean) => {
    setIsEmailSent(value);
  };

  const handleEmailError = (value: boolean) => {
    setIsError(value);
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

      try {
        await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then(({ user }: any) => {
          console.log({ user });
          return user.getIdToken().then(async (idToken: any) => {
            setIdToken(idToken);

            return idToken;
          });
        });

        setSubmit(true);
      } catch (error) {
        handleEmailError(true);
        console.error('Error singing in', error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && idToken !== '') {
      setCookies(COOKIE_TOKEN, idToken, {
        // Setting the token to one hour
        expires: new Date(Date.now() + 1000 * 60 * 60),
        path: '/',
      });

      window.location.href = '/pick-a-partner';
    }
  }, [isSuccess]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isError}
        autoHideDuration={6000}
        onClose={() => handleEmailError(false)}
      >
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          Signing in failed! User with provided email does not exist.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isEmailSent}
        autoHideDuration={6000}
        onClose={() => setIsEmailSent(false)}
      >
        <Alert variant="filled" severity="info" sx={{ width: '100%' }}>
          Link to password reset has been sent to provided email!
        </Alert>
      </Snackbar>
      {/* animations start */}
      <Grid
        container
        className="login full-width"
        sx={{ height: '100vh', width: '100%' }}
      >
        <Grid
          item
          className="animated-images container"
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundColor: BLAZE_ORANGE,
            width: '50%',
          }}
        >
          here will be image
        </Grid>
        {/* animations finish */}
        <Container
          maxWidth={false}
          component="main"
          className="containter-text"
          sx={{
            backgroundColor: WOODSMOKE,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            heigth: '100%',
            width: '50%',
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
            <Typography
              component="h1"
              sx={{ color: BLAZE_ORANGE, fontSize: '40px' }}
            >
              Welcome to the Chattie
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              mt={3}
            >
              <Grid
                container
                className="grid sign-in-link"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                <Box className="slogan-text">
                  <Typography>Don’t have an account?</Typography>
                  <Typography>It will take less than a minute.</Typography>
                </Box>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleClose}
                    disableRipple
                    disableFocusRipple
                    sx={{
                      color: BLAZE_ORANGE,
                      '&:hover': {
                        backgroundColor: 'rgb(255, 103, 0, 0.05)',
                      },
                    }}
                  >
                    Create an account
                  </Button>
                </Link>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomBorderTextField
                      id="standard-basic"
                      variant="standard"
                      autoComplete="email"
                      name="email"
                      required
                      fullWidth
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
                      id="standard-basic"
                      variant="standard"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
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
                <CustomLoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  disabled={
                    Object.keys(formik.values).length === 0 ||
                    Object.keys(formik.errors).length !== 0
                  }
                >
                  SIGN IN
                </CustomLoadingButton>
                <Box>
                  <Button
                    disableRipple
                    disableFocusRipple
                    onClick={handleOpen}
                    sx={{
                      color: BLAZE_ORANGE,
                      '&:hover': { backgroundColor: 'rgb(255, 103, 0, 0.05)' },
                    }}
                  >
                    Forgot your password?
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
      <ForgotPasswordModal
        isModalOpen={open}
        handleClose={handleClose}
        handleEmailSent={handleEmailSent}
        handleEmailError={handleEmailError}
      />
    </>
  );
};

export default LoginPage;

const ChangePasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordModal: FC<{
  isModalOpen: boolean;
  handleClose: () => void;
  handleEmailSent: (value: boolean) => void;
  handleEmailError: (value: boolean) => void;
}> = ({ isModalOpen, handleClose, handleEmailSent, handleEmailError }) => {
  const { auth } = useChattieContext();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await sendPasswordResetEmail(auth, values.email)
          .then(() => {
            handleEmailSent(true);
            handleClose();
          })
          .catch(() => {
            handleEmailError(true);
          });
      } catch (error) {
        handleEmailError(true);
        console.error('Error sending email', error);
      }

      setIsLoading(false);
    },
  });

  return (
    <Dialog
      open={isModalOpen}
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
      <DialogTitle>Forgot your password?</DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            We’ll email you a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
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
          {formik.touched.email && formik.errors.email && (
            <Box color="red" fontSize={14}>
              {formik.errors.email}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disableRipple
            disableFocusRipple
            sx={{
              color: BLAZE_ORANGE,
              '&:hover': {
                backgroundColor: WOODSMOKE,
                opacity: 0.05,
              },
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            disableRipple
            disableFocusRipple
            loading={isLoading}
            sx={{
              backgroundColor: BLAZE_ORANGE,
              ':hover': {
                bgcolor: 'black',
                color: 'white',
              },
            }}
          >
            Send me a password reset link
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
