import { useCookies } from 'react-cookie';
import { COOKIE_TOKEN } from '../types';

const useCheckAuthentication = (): boolean => {
  const isMainPage = window.location.href.endsWith('localhost:3000/');
  const isAuthenticating =
    window.location.href.includes('/login') ||
    window.location.href.includes('/register');
  const [{ token }] = useCookies([COOKIE_TOKEN]);

  // I need to check `localhost` because I cannot check endpoint
  // as there is non. If we ever want to deploy it to any server
  // we must store the host path to variable and check it there
  // but as for now, it's best I can do.
  if (isMainPage && token != null) {
    return true;
  }

  if (isAuthenticating && token != null) {
    window.location.href = '/pick-a-partner';

    return true;
  }

  if (!isAuthenticating && !isMainPage && token == null) {
    window.location.href = '/';

    return false;
  }

  // This value shouldn't be reached, but I use it to not
  // bother with undefined return type.
  return false;
};

export default useCheckAuthentication;
