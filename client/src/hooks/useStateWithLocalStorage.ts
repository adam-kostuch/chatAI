import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

const useStateWithLocalStorage = <TState>(
  key: string,
  defaultValue?: TState
): [TState, Dispatch<SetStateAction<TState>>] => {
  const [state, setState] = useState<TState>(
    () => JSON.parse(window.localStorage.getItem(key) as string) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useStateWithLocalStorage;
