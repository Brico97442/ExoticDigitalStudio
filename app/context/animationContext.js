import { createContext, useContext, useState,useEffect } from 'react';

const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <AnimationContext.Provider value={{ animationComplete, setAnimationComplete }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}
