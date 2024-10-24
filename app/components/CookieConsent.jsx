import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Ici vous pouvez ajouter votre logique pour activer les cookies
  };

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', 'refused');
    setIsVisible(false);
    // Ici vous pouvez ajouter votre logique pour désactiver les cookies
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <Alert className="relative bg-white border border-gray-200 shadow-lg rounded-lg">
        <AlertTitle className="text-lg font-semibold mb-2 pr-8">
          🍪 Gestion des Cookies
        </AlertTitle>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <AlertDescription>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site.
              Vous pouvez choisir d'accepter ou de refuser ces cookies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={handleRefuse}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Refuser
              </button>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Pour plus d'informations, consultez notre{' '}
                <a href="/privacy" className="text-purple-500 hover:underline">
                  politique de confidentialité
                </a>
              </p>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CookieConsent;