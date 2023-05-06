import React from 'react';
import useSignOut from './hooks/useSignOut';
import useOpenAI from './hooks/useOpenAI';

const SampleData: React.FC = () => {
  // openai
  const [message, setMessage] = React.useState('');
  const [openaiResponse, setOpenaiResponse] = React.useState('');

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = useOpenAI(message);

    setOpenaiResponse(data ?? '');
  };

  const handleSignOut = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isLoading, isError } = await useSignOut();

    console.log({ isLoading, isError });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          AI
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div>{openaiResponse}</div>
      </div>
      <div style={{ height: '50px' }} />
      <div>
        <form onSubmit={handleSignOut}>
          Sign out
          <button type="submit">Bye!</button>
        </form>
      </div>
    </>
  );
};

export default SampleData;
