import React, { useEffect } from 'react';

export default function Bodyscrolllock({ isLocked }) {
  useEffect(() => {
    // Verrouille le scroll si isLocked est true
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Nettoyage: Assure que le body revient à l'état normal lors du démontage
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLocked]);

  return null;
}
