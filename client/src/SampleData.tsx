import React from 'react';
import useRegistration from './hooks/useRegistration';
import useLogin from './hooks/useLogin';
import useSignOut from './hooks/useSignOut';
import useChangePassword from './hooks/useChangePassword';
import useOpenAI from './hooks/useOpenAI';

const SampleData: React.FC = () => {
  // openai
  const [message, setMessage] = React.useState('');
  const [openaiResponse, setOpenaiResponse] = React.useState('');

  // registration
  const [newDisplayName, setNewDisplayName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newUserResponse] = React.useState('');

  // login
  const [email, setEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [userResponse] = React.useState('');

  // forgot
  const [forgotPassword, setForgotPassword] = React.useState('');

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = useOpenAI(message);

    setOpenaiResponse(data ?? '');
  };

  const handleCreateUser = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, isLoading, isError } = useRegistration({
      email: newEmail,
      displayName: newDisplayName,
      password: newPassword,
    });

    console.log({ data, isLoading, isError });
  };

  const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const login = event.target[0] as HTMLInputElement;
    const password = event.target[1] as HTMLInputElement;

    const { cookie, isLoading, isError } = await useLogin({
      login: login.value,
      password: password.value,
    });

    console.log({ cookie, isLoading, isError });
  };

  const handleSignOut = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isLoading, isError } = await useSignOut();

    console.log({ isLoading, isError });
  };

  const handleResetPassword = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const forgot = event.target[0] as HTMLInputElement;

    const { isLoading, isError } = await useChangePassword(forgot.value);

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
        <form onSubmit={handleCreateUser}>
          Registration
          <input
            type="text"
            value={newDisplayName}
            onChange={(event) => setNewDisplayName(event.target.value)}
          />
          <input
            type="text"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
          <input
            type="text"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div>{newUserResponse}</div>
      </div>
      <div style={{ height: '50px' }} />
      <div>
        <form onSubmit={handleLogin}>
          Login
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div>{userResponse}</div>
      </div>
      <div style={{ height: '50px' }} />
      <div>
        <form onSubmit={handleSignOut}>
          Sign out
          <button type="submit">Bye!</button>
        </form>
      </div>
      <div style={{ height: '50px' }} />
      <div>
        <form onSubmit={handleResetPassword}>
          Forgot password?
          <input
            type="text"
            value={forgotPassword}
            onChange={(event) => setForgotPassword(event.target.value)}
          />
          <button type="submit">Reset!</button>
        </form>
      </div>
    </>
  );
};

export default SampleData;
