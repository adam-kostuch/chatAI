import { FC } from 'react';
import { Button } from '@mui/material';
import { signOut } from '@firebase/auth';
import { useCookies } from 'react-cookie';
import { useChattieContext } from 'src/ChattieContext';
import { COOKIE_TOKEN } from 'src/types';
import { Auth } from 'firebase/auth';

const assertUnreachable = (_: never): never => {
  throw new Error(`Unexpected value: ${_}`);
};

type ButtonActions = 'Log Out' | 'Sign Up' | 'Sign In';

export const handleSignOut = async ({
  auth,
  removeCookie,
}: {
  auth: Auth;
  removeCookie: (name: string, options?: any) => void;
}) => {
  await signOut(auth)
    .then(() => removeCookie(COOKIE_TOKEN))
    .catch((error) => {
      console.error("Couldn't sign out user!", error);
    });
};

interface RedirectButtonProps {
  color: string;
  borderColor: string;
  buttonLabel: ButtonActions;
}

const RedirectButton: FC<RedirectButtonProps> = ({
  color,
  borderColor,
  buttonLabel,
}) => {
  const { auth } = useChattieContext();
  const [, , removeCookie] = useCookies();

  const handleRedirect = () => {
    switch (buttonLabel) {
      case 'Sign In':
        handleSignIn();
        break;
      case 'Sign Up':
        handleSignUp();
        break;
      case 'Log Out':
        handleSignOut({ auth, removeCookie });
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
      variant={buttonLabel === 'Sign In' ? 'text' : 'outlined'}
      onClick={() => handleRedirect()}
      sx={{
        color: color,
        backgroundColor: borderColor,
        fontSize: '1rem',
        fontWeight: '700',
        borderRadius: '10px',
        '&:hover': {
          borderColor: borderColor,
          color: borderColor,
        },
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default RedirectButton;
