import React from 'react';
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
    </>
  );
};

export default SampleData;
