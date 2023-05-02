// import { useQuery } from 'react-query';
// import { useChattieContext } from 'src/ChattieContext';
import ChattieApiClient from '../clients/ChattieApiClient';

const useOpenAI = async (message: string) => {
  // const { apiClient, isValidSession } = useChattieContext();
  const apiClient = new ChattieApiClient();

  // if (!isValidSession) {
  //   return { isError: true };
  // }

  // const { data, isLoading, isError } = useQuery(['openai', { message }], () =>
  //   apiClient.openai(message)
  // );

  const data = await apiClient.openai(message);

  return { data, isLoading: false, isError: false };
};

export default useOpenAI;
