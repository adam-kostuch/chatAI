import React, { useContext } from 'react';
import ChattieApiClient from './clients/ChattieApiClient';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? '',
  authDomain: 'chattie-66940.firebaseapp.com',
  projectId: 'chattie-66940',
  storageBucket: 'chattie-66940.appspot.com',
  messagingSenderId: '572920400633',
  appId: '1:572920400633:web:772e0e1597282913a37028',
};

export interface ChattieContextProps {
  apiClient: ChattieApiClient;
  auth: Auth;
  db: Firestore;
}

export const ChattieContext = React.createContext<ChattieContextProps>(
  {} as ChattieContextProps
);

const ChattieContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const apiClient = new ChattieApiClient();
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  return (
    <ChattieContext.Provider value={{ apiClient, auth, db }}>
      {children}
    </ChattieContext.Provider>
  );
};

const useChattieContext = (): ChattieContextProps => {
  const context = useContext(ChattieContext);

  if (context == null) {
    throw new Error(
      'useChattieContext must be used within a ChattieContextProvider'
    );
  }

  return context;
};

export { ChattieContextProvider, useChattieContext };
