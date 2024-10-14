import { createContext, useContext, useState,useEffect } from 'react';

const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  return (
    <AnimationContext.Provider value={{ loadingComplete, setLoadingComplete }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}
