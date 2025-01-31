'use client'
import React from 'react'

export default function CookieConsent() {
  const HandleCreateCookieSession = async () => {
    try {
      const response = await fetch('/api/cookieSession', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cookieName: "CookieSession",
          cookieValue: "cookieSessionValue"
        }),
      });
      
      const data = await response.json();
      // console.log('Réponse:', data);
      
      // // Vérification si le cookie existe après la création
      // console.log('Cookies actuels:', document.cookie);
      
      if (!response.ok) throw new Error('Erreur lors de la création du cookie');
      alert('CookieSession-created');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur : ' + error.message);
    }
  }
  
  return (
    <button 
      className='fixed bottom-0 right-0 mb-[20px] border rounded-2xl mr-[20px]  w-1/4 h-[80px] z-10 bg-blue-500 hover:bg-blue-700 text-white' 
      onClick={HandleCreateCookieSession}
    >
      Créer un cookie de session
    </button>
  )
}