import { useCookies } from 'react-cookie';

const useCheckAuthentication = () => {
  const [cookies] = useCookies(['token']);

  if (cookies.token == null) {
    window.location.href = '/';
  }

  console.log(cookies.token);
};

export default useCheckAuthentication;
