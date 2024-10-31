
"use client"
import React, { useRef, useState } from "react";
import Magnetic from "../utils/Magnetic"

function ContactForm() {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState("");


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_m5cmqly', 'template_mm758gb', form.current, {
                publicKey: 'HrZ-9kP7V5zM5Kd1B',
            })
            .then(
                (result) => {
                    console.log('SUCCESS!');
                    setSuccessMessage("Votre message à bien été envoyé");
                    e.target.reset()
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    return (
        <div className="flex items-center justify-center flex-col w-1/2 z-[1] ">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col items-start gap-6 w-full text-black z-[1]">

                <input className="min-h-[5vh] p-4 w-full z-[1]"
                    type="text" id="user_name" name="user_name" required placeholder="Nom complet"/>
                <input
                    className="min-h-[5vh]  p-4 w-full "
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="Email"
                />
                <input
                    className="min-h-[5vh] p-4 w-full text-white z-[1]"
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Sujet"

                />
                <textarea className="min-h-[5vh] p-4 w-full z-[1]"
                    id="message"
                    name="message"
                    placeholder="Votre Message"
                    required>
                </textarea>
                <Magnetic>
                    <button className=" z-[1] w-full h-full min-w-[200px] border border-black p-2 rounded-full bg-purple-600 text-white" type="submit">Envoyer</button>
                </Magnetic>
                {successMessage && <p>{successMessage}</p>}
            </form></div>


    );
}

export default ContactForm;