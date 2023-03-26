import React from 'react';
import './App.css';

const App: React.FC = () => {
  const [message, setMessage] = React.useState('');
  const [response, setResponse] = React.useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetch('http://localhost:8090/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type='submit'>Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default App;
