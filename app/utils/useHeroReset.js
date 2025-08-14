import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animateHero } from './animation';

export const useHeroReset = (textScrollRef) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Fonction pour réinitialiser les animations hero
    const resetHeroAnimations = () => {
      const heroElements = [
        '#hero-title',
        '#hero-subtitle', 
        '#hero-scroll',
        '#studio-text',
        '#coordinates-gps p'
      ];
      
      // Réinitialiser tous les éléments hero
      heroElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          gsap.set(el, { 
            y: 0, 
            opacity: 1, 
            visibility: 'visible',
            clearProps: 'transform,opacity,visibility'
          });
        });
      });
      
      // Relancer les animations après un court délai
      setTimeout(() => {
        if (textScrollRef.current) {
          animateHero(textScrollRef);
        }
      }, 150);
    };

    // Réinitialiser seulement si ce n'est pas la première fois
    if (isInitialized.current) {
      resetHeroAnimations();
    } else {
      isInitialized.current = true;
    }

    // Écouter les changements de route
    const handleRouteChange = () => {
      setTimeout(resetHeroAnimations, 100);
    };

    // Ajouter l'écouteur d'événement pour les changements de route
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange);
      
      // Écouter les événements de navigation Next.js
      const originalPushState = history.pushState;
      history.pushState = function(...args) {
        originalPushState.apply(history, args);
        handleRouteChange();
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleRouteChange);
        history.pushState = history.pushState;
      }
    };
  }, [textScrollRef]);

  return isInitialized.current;
};
