
"use client"
import React, { useRef, useState } from "react";

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
        <div className="flex items-center justify-center flex-col p-6 ">
            <div className=" gap-6 flex items-center flex-col">
                <h2 className="text-[8vh] w-2/3 leading-none">Dites m'en plus</h2> 
                <p >sur votre projet</p>
                </div>

            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 w-1/2">

                <input type="text" id="user_name" name="user_name" required placeholder="Nom" />
                <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="Email"
                />
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Sujet"
                />
                <textarea id="message" name="message" placeholder="Votre Message" required></textarea>
                <button type="submit">Envoyer</button>
                {successMessage && <p>{successMessage}</p>}
            </form></div>


    );
}

export default ContactForm;