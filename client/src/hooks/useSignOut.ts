import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import { useChattieContext } from '../ChattieContext';

const useSignOut = async () => {
  const { apiClient, auth } = useChattieContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  await signOut(auth).then(() => {
    const {
      isLoading: isSignOutLoading,
      isError: isSignOutError,
      isSuccess: isSignOutSuccess,
    } = useQuery(['signOut'], () => apiClient.signOut());

    useEffect(() => {
      setIsLoading(isSignOutLoading);
      setIsError(isSignOutError);
      setIsSuccess(isSignOutSuccess);
    }, [isSignOutLoading, isSignOutError, isSignOutSuccess]);
  });

  if (isSuccess) {
    localStorage.removeItem('cookie');
  }

  return { isLoading, isError };
};

export default useSignOut;
