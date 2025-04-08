import { useState } from 'react';

type SmartSetter<T> = <K extends keyof T>(key: K, value: T[K]) => void;

export function useSmartState<T>(initialValue: T): [T, SmartSetter<T>] {
  const [state, setState] = useState<T>(initialValue);

  const smartSetter: SmartSetter<T> = (key, value) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return [state, smartSetter];
}
