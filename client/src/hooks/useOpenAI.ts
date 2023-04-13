import { useQuery } from 'react-query';
// import { useChattieContext } from 'src/ChattieContext';
import ChattieApiClient from 'src/clients/ChattieApiClient';

const useOpenAI = (message: string) => {
  // const { apiClient } = useChattieContext();
  const apiClient = new ChattieApiClient();

  // if (!isValidSession) {
  //   return { isError: true };
  // }

  const { data, isLoading, isError } = useQuery(['openai', { message }], () =>
    apiClient.openai(message)
  );

  return { data, isLoading, isError };
};

export default useOpenAI;
