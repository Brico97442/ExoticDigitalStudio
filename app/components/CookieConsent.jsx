'use client'

import React from 'react'

export default function CookieConsent() {
  const HandleCreateCookieSession = async () => {
    await fetch('api/cookieSession', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cookieName: "CookieSession",
        cookieValue: "cookieSessionValue"
      }),
    })
    alert('CookieSession-created');
  }
  return (
    <div>
      Créer un cookie bouton de session
    </div>
  )
}
