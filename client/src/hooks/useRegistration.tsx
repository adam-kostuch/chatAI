import { useQuery } from 'react-query';
import { RegistrationProps } from '../types';
import { useChattieContext } from '../ChattieContext';

const useRegistration = (props: RegistrationProps) => {
  const { apiClient } = useChattieContext();
  const { data, isLoading, isError } = useQuery(['register', props], () =>
    apiClient.registration(props)
  );

  return { data, isLoading, isError };
};

export default useRegistration;
