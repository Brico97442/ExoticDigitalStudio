
"use client"
import React, { useRef, useState } from "react";
import Magnetic from "../utils/Magnetic"
import emailjs from '@emailjs/browser';
import Button from "./Button";
import { GeistSans } from 'geist/font/sans';

function ContactForm() {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState("");


    const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        console.log('SUCCESS!');
        setSuccessMessage("✅ Votre message a bien été envoyé !");
        e.target.reset();
      },
      (error) => {
        console.error('FAILED...', error.text);
        setSuccessMessage("❌ Une erreur est survenue, réessayez.");
      }
    );
};

      
    return (
        <div className="flex items-center justify-center flex-col w-2/3 z-[1] ">
            <form ref={form} onSubmit={sendEmail} className={`${GeistSans.className} flex flex-col items-start gap-8 w-full text-black z-[1]`}>

                <input className="min-h-[5vh] px-4 py-6 w-full z-[1] rounded-lg placeholder:text-[18px]"
                    type="text" id="user_name" name="user_name" required placeholder="Nom complet"/>
                <input
                    className="min-h-[5vh] px-4 py-6 w-full text-white rounded-lg placeholder:text-[18px]"
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="Email"
                />
                <input
                    className="min-h-[5vh] px-4 py-6 w-full text-white z-[1] rounded-lg placeholder::text-[18px]"
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Sujet"

                />
                <textarea className="min-h-[25vh] px-4 py-6 w-full z-[1] rounded-lg placeholder:text-[18px]"
                    id="message"
                    name="message"
                    placeholder="Votre Message"
                    required>
                </textarea>
                {/* <Magnetic> */}
                    {/* <button className=" z-[1] w-full h-full min-w-[200px] border border-black p-2 rounded-full bg-purple-600 text-white" type="submit">Envoyer</button> */}
                    <Button value='Envoyer' type="submit"/>
                {/* </Magnetic> */}
                {successMessage && <p>{successMessage}</p>}
            </form></div>


    );
}

export default ContactForm;