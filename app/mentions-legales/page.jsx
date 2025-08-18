'use client';
import { useEffect } from 'react'
import gsap from 'gsap';

export default function LegalMentions() {
    useEffect(() => {
        gsap.fromTo("#main", 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.5, ease: "power2.inOut" }
        );
    }, []);
    return (
        <div className=" w-full h-full min-h-screen flex flex-col z-[2] relative text-6xl">
           <h1 className="tracking-tighter text-[210px] leadind-none mt-40">Mentions Légales</h1>
           <div  className=" w-full h-full px-[50px] z-[2]">
            <div className="bg-white text-black rounded-lg p-16 text-xl leading-relaxed shadow-lg max-w-[70%] mx-auto py-20 flex flex-col gap-8">
                <h2 className="text-4xl font-bold mb-8">Mentions légales</h2>
                <p><strong>Éditeur du site :</strong><br />
                Exotik Digital Studio<br />
                Adresse : 14 impasse des vanilliers, 97430 Le Tampon, La Réunion<br />
                Email : exotikdigitalstudio@outlook.com<br />
                Téléphone : +262 692 58 59 99
                </p>

                <p className="mt-8"><strong>Directeur de la publication :</strong><br />
                Monsieur Amanville Damien
                </p>

                <p className="mt-8"><strong>Hébergement :</strong><br />
                Vercel Inc.<br />
                340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
                Site web : <a href="https://vercel.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
                </p>

                <p className="mt-8"><strong>Propriété intellectuelle :</strong><br />
                L’ensemble du contenu du site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Exotik Digital Studio, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
                </p>

                <p className="mt-8"><strong>Protection des données personnelles :</strong><br />
                Les informations recueillies via les formulaires de contact sont destinées uniquement à Exotik Digital Studio et ne seront jamais transmises à des tiers sans votre consentement. Conformément à la loi « Informatique et Libertés », vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à l’adresse indiquée ci-dessus.
                </p>

                <p className="mt-8"><strong>Cookies :</strong><br />
                Le site peut utiliser des cookies pour améliorer l’expérience utilisateur. Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur.
                </p>

                <p className="mt-8"><strong>Responsabilité :</strong><br />
                Exotik Digital Studio s’efforce d’assurer l’exactitude des informations diffusées sur ce site. Toutefois, la responsabilité de l’éditeur ne saurait être engagée en cas d’erreur, d’omission ou de mise à jour tardive des informations.
                </p>
            </div>
           </div>
        </div>
    );
}

