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

type ButtonActions = 'LOG OUT' | 'SIGN UP' | 'SIGN IN';

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
  backgroundColor: string;
  buttonLabel: ButtonActions;
}

const RedirectButton: FC<RedirectButtonProps> = ({
  color,
  backgroundColor,
  buttonLabel,
}) => {
  const { auth } = useChattieContext();
  const [, , removeCookie] = useCookies();

  const handleRedirect = () => {
    switch (buttonLabel) {
      case 'SIGN IN':
        handleSignIn();
        break;
      case 'SIGN UP':
        handleSignUp();
        break;
      case 'LOG OUT':
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
      variant={buttonLabel === 'SIGN IN' ? 'text' : 'contained'}
      onClick={() => handleRedirect()}
      sx={{
        color,
        backgroundColor,
        fontSize: '1rem',
        fontWeight: '700',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: color,
          color: backgroundColor,
        },
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default RedirectButton;
