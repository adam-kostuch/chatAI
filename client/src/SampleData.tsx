import React from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import './App.css';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYzMD59mNNKuv9Fc0J9P0I9FE9Mdp2ktw',
  authDomain: 'chattie-66940.firebaseapp.com',
  projectId: 'chattie-66940',
  storageBucket: 'chattie-66940.appspot.com',
  messagingSenderId: '572920400633',
  appId: '1:572920400633:web:772e0e1597282913a37028',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const App: React.FC = () => {
  // openai
  const [message, setMessage] = React.useState('');
  const [response, setResponse] = React.useState('');

  // registration
  const [newDisplayName, setNewDisplayName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newUserResponse, setNewUserResponse] = React.useState('');

  // login
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userResponse, setUserResponse] = React.useState('');

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post('http://localhost:8090/openai', { message })
      .then((res) => setResponse(JSON.stringify(res)))
      .catch((err) => console.log({ err }));
  };

  const handleCreateUser = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post('http://localhost:8090/authentication/register', {
        email: newEmail,
        displayName: newDisplayName,
        password: newPassword,
      })
      .then((res) => setNewUserResponse(JSON.stringify(res)))
      .catch((err) => console.log({ err }));
  };

  const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const login = event.target[0] as HTMLInputElement;
    const password = event.target[1] as HTMLInputElement;

    await signInWithEmailAndPassword(auth, login.value, password.value).then(
      ({ user }: any) => {
        return user.getIdToken().then(async (idToken: any) => {
          const response = await fetch(
            'http://localhost:8090/authentication/login',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              } as HeadersInit,
              body: JSON.stringify({ idToken }),
            }
          );

          localStorage.setItem(
            'cookie',
            JSON.stringify(
              await response.json().then((data) => data.sessionCookie)
            )
          );
          return response;
        });
      }
    );
  };

  const handleSignOut = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signOut(auth).then(() => {
      axios.get('http://localhost:8090/authentication/signOut');

      localStorage.removeItem('cookie');
    });
  };

  const handleResetPassword = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await sendPasswordResetEmail(auth, email).then(() => {
      axios.get('http://localhost:8090/authentication/changePassword');
    });
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
        <div>{response}</div>
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
          <button type="submit">Reset!</button>
        </form>
      </div>
    </>
  );
};

export default App;
