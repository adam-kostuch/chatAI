import { FC, ChangeEvent, useState } from 'react';
import { useOpenAI } from './hooks';

const SampleData: FC = () => {
  // openai
  const [message, setMessage] = useState('');
  const [openaiResponse, setOpenaiResponse] = useState('');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
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
