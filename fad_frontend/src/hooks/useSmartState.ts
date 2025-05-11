import { useState } from 'react';

export type setField<T> = <K extends keyof T>(key: K, value: T[K]) => void;
export type setValue<T> = (newValue: T) => void;

export function useSmartState<T>(initialValue: T): [T, setField<T>, setValue<T>] {
  const [state, setState] = useState<T>(initialValue);

  const setField: setField<T> = (key, value) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const setValue: setValue<T> = (value) => {
    setState(value);
  };
  return [state, setField, setValue];
}
