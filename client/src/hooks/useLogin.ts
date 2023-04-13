import { useState, useEffect } from 'react';
import useStateWithLocalStorage from './useStateWithLocalStorage';
import { useQuery } from 'react-query';
import { LoginProps } from '../types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useChattieContext } from '../ChattieContext';

const useRegistration = async ({ login, password }: LoginProps) => {
  const { apiClient, auth } = useChattieContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cookie, setCookie] = useStateWithLocalStorage('cookie');

  await signInWithEmailAndPassword(auth, login, password).then(
    ({ user }: any) => {
      return user.getIdToken().then(async (idToken: any) => {
        const { isLoading: isLoginLoading, isError: isLoginError } = useQuery(
          ['login', { login, password }],
          () => apiClient.login(idToken)
        );

        useEffect(() => {
          setIsLoading(isLoginLoading);
          setIsError(isLoginError);
          setCookie(idToken);
        }, [cookie, isLoading, isError]);

        return cookie;
      });
    }
  );

  return { cookie, isLoading, isError };
};

export default useRegistration;
