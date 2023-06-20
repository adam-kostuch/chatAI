import { FC, ReactNode, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import ChattieApiClient from './clients/ChattieApiClient';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Chatter } from './types';
import { useUserData } from './hooks';
import { emptyChatter } from './utils';
import { Loading } from './shared/components';

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
  auth: Auth;
  db: Firestore;
  activeUser: Chatter;
  apiClient: ChattieApiClient;
}

export const ChattieContext = createContext<ChattieContextProps>(
  {} as ChattieContextProps
);

const ChattieContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const apiClient = new ChattieApiClient();
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  const [activeUser, setActiveUser] = useState(emptyChatter);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setActiveUser(
        user
          ? (await useUserData(db, user.email as string)) || emptyChatter
          : emptyChatter
      );
      setIsLoading(false);
    });

    unsubscribe();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ChattieContext.Provider value={{ apiClient, auth, db, activeUser }}>
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
