import { FC } from 'react';
import { Button } from '@mui/material';
import { signOut } from '@firebase/auth';
import { useCookies } from 'react-cookie';
import { COOKIE_TOKEN } from 'src/types';
import { Auth } from 'firebase/auth';
import { useChattieContext } from 'src/ChattieContext';
import {
  APPROX_BLUE,
  LIGHT_GRAYISH_BLUE,
  VANILLA_WHITE,
} from '@chattie/colors';
import { assertUnreachable } from 'src/helpers';

type ButtonActions = 'Log Out' | 'Sign Up' | 'Sign In';

export const handleSignOut = async (
  auth: Auth,
  removeCookie: (name: string, options?: any) => void
) => {
  await signOut(auth)
    .then(() => {
      removeCookie(COOKIE_TOKEN);
      window.location.href = '/';
    })
    .catch((error) => {
      throw new Error(`Error signing out user ${error}`);
    });
};

interface RedirectButtonProps {
  buttonLabel: ButtonActions;
}

const RedirectButton: FC<RedirectButtonProps> = ({ buttonLabel }) => {
  const { auth } = useChattieContext();
  const [, , removeCookie] = useCookies();
  const primaryColor = buttonLabel === 'Sign In' ? APPROX_BLUE : VANILLA_WHITE;
  const secondaryColor =
    buttonLabel === 'Sign In' ? LIGHT_GRAYISH_BLUE : APPROX_BLUE;

  const handleRedirect = () => {
    switch (buttonLabel) {
      case 'Sign In':
        handleSignIn();
        break;
      case 'Sign Up':
        handleSignUp();
        break;
      case 'Log Out':
        handleSignOut(auth, removeCookie);
        break;
      default:
        assertUnreachable(buttonLabel);
        break;
    }
  };

  const handleSignUp = () => {
    window.location.href = '/register';
  };

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  return (
    <Button
      className={`${buttonLabel.replace(/\s+/g, '-').toLowerCase()}-button`}
      variant={buttonLabel === 'Sign In' ? 'text' : 'outlined'}
      onClick={() => handleRedirect()}
      sx={{
        color: primaryColor,
        backgroundColor: secondaryColor,
        fontSize: '1rem',
        fontWeight: '700',
        borderRadius: '10px',
        fontFamily: 'Jura',
        '&:hover': {
          borderColor: primaryColor,
          color: secondaryColor,
        },
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default RedirectButton;
