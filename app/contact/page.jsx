import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <section className="flex justify-center items-center w-full py-[144px] px-[50px]">
            <div className=" w-full h-full flex flex-col z-[3] ">
            <h1 className="text-[210px] leading-none">Contact</h1>
                <div className="w-full gap-6 flex flex-col px-[50px]">
                    <h2 className="tracking-tighter text-[38px]">Vous souhaitez être contacter et nous parler de votre projet ?</h2>
                    <p className="tracking-tighter text-[24px]">Remplissez le formulaire ci dessous, notre équipe s&apos;engage à vous contacter sous 48h</p>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
