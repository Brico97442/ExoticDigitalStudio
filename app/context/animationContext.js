import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  return (
    <LoadingContext.Provider value={{ loadingComplete, setLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoadingContext);
}
