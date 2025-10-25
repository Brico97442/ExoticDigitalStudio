'use client';


export default function ConfidentialPolitic() {

    return (
        <div className=" w-full flex flex-col z-[1] relative text-6xl py-8 backdrop-blur-[100px]  bg-opacity-50">
           <h1 className="tracking-tighter text-[180px] leadind-none pl-[80px] pt-40">Politique de confidentialité</h1>
           <div className=" w-full h-full px-[50px] z-[2] mt-16">
            <div className="bg-white text-black rounded-lg p-16 text-xl leading-relaxed shadow-lg max-w-[70%] mx-auto py-20 flex flex-col gap-8">
                <h2 className="text-4xl font-bold pb-8">Politique de confidentialité</h2>
                <p>
                    <strong>1. Introduction</strong><br />
                    La présente politique de confidentialité a pour objectif d’informer les utilisateurs du site Exotik Digital Studio sur la collecte, l’utilisation et la protection de leurs données personnelles, conformément à la législation française et au Règlement Général sur la Protection des Données (RGPD).
                </p>

                <p className="pt-8">
                    <strong>2. Responsable du traitement</strong><br />
                    Exotik Digital Studio<br />
                    14 impasse des vanilliers, 97430 Le Tampon, La Réunion<br />
                    Email : exotikdigitalstudio@outlook.com
                </p>

                <p className="pt-8">
                    <strong>3. Données collectées</strong><br />
                    Nous collectons uniquement les données strictement nécessaires à la gestion de vos demandes via le formulaire de contact : nom, prénom, adresse e-mail, numéro de téléphone et message. Ces informations sont fournies volontairement par l’utilisateur.
                </p>

                <p className="pt-8">
                    <strong>4. Finalités du traitement</strong><br />
                    Les données collectées sont utilisées uniquement pour répondre à vos demandes de contact, vous fournir des informations ou des devis, et assurer le suivi de la relation client. Elles ne sont en aucun cas utilisées à des fins commerciales sans votre consentement explicite.
                </p>

                <p className="pt-8">
                    <strong>5. Destinataires des données</strong><br />
                    Vos données personnelles sont exclusivement destinées à Exotik Digital Studio. Elles ne sont ni vendues, ni cédées, ni transmises à des tiers, sauf obligation légale ou judiciaire.
                </p>

                <p className="pt-8">
                    <strong>6. Durée de conservation</strong><br />
                    Les données sont conservées pendant la durée nécessaire au traitement de votre demande et au maximum 3 ans après le dernier contact, sauf obligation légale contraire.
                </p>

                <p className="pt-8">
                    <strong>7. Sécurité</strong><br />
                    Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données personnelles.
                </p>

                <p className="pt-8">
                    <strong>8. Vos droits</strong><br />
                    Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour exercer ces droits, contactez-nous à l’adresse indiquée ci-dessus. Vous pouvez également introduire une réclamation auprès de la CNIL.
                </p>

                <p className="pt-8">
                    <strong>9. Cookies</strong><br />
                    Ce site utilise des cookies nécessaires à son bon fonctionnement et à l’amélioration de l’expérience utilisateur. Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.
                </p>

                <p className="pt-8">
                    <strong>10. Modification de la politique</strong><br />
                    Exotik Digital Studio se réserve le droit de modifier la présente politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
                </p>
            </div>
           </div>
        </div>
    );
}

