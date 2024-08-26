
"use client"
import React, { useRef, useState } from "react";
import Magnetic from "../utils/Magnetic"

function ContactForm() {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState("");


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_m5cmqly', 'template_mm758gb', form.current, {
                publicKey: 'HrZ-9kP7V5zM5Kd1B',
            })
            .then(
                (result) => {
                    console.log('SUCCESS!');
                    setSuccessMessage("Message envoyé");
                    e.target.reset()
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    return (
        <div className="flex items-center justify-center flex-col w-full z-[1]">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col items-start gap-6 w-full text-black z-[1]">

                <input className="h-[10vh] p-6 w-full bg-transparent z-[1]"
                    type="text" id="user_name" name="user_name" required placeholder="Nom" />
                <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="Email"
                    className="h-[10vh]  p-6 w-full bg-transparent"
                />
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Sujet"
                    className="h-[10vh] p-6 w-full bg-transparent text-white z-[1]"

                />
                <textarea className="h-[10vh] p-6 w-full bg-transparent z-[1]"
                    id="message" name="message" placeholder="Votre Message" required></textarea>
                <Magnetic>
                    <button className=" z-[1] w-full h-full min-w-[200px] border hover:scale-x-200 border-black p-2 rounded-full bg-gradient-to-b from-[#D90429]/50 to-[#2B2D42]/50 bg-transparent" type="submit">Envoyer</button>
                    </Magnetic>
                {successMessage && <p>{successMessage}</p>}
            </form></div>


    );
}

export default ContactForm;