import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useChattieContext } from '../ChattieContext';

const useSignOut = async (email: string) => {
  const { apiClient, auth } = useChattieContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  await sendPasswordResetEmail(auth, email).then(() => {
    const { isLoading: isPasswordLoading, isError: isPasswordError } = useQuery(
      ['changePassword'],
      () => apiClient.changePassword()
    );

    useEffect(() => {
      setIsLoading(isPasswordLoading);
      setIsError(isPasswordError);
    }, [isPasswordLoading, isPasswordError]);
  });

  return { isLoading, isError };
};

export default useSignOut;
