import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request) {
    const {cookieName, cookieValue} = await request.json();
    
    // Créer la réponse
    const response = NextResponse.json({
        message: 'CookieSessioncreated'
    });

    // Définir le cookie avec plus d'options pour assurer sa création
    response.cookies.set({
        name: cookieName,
        value: cookieValue,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 3600 // durée de vie en secondes (1 heure ici)
    });

    return response;
}