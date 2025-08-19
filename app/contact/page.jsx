import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <div className="flex justify-center items-center w-full px-[80px] py-[180px]">
            <div className=" w-full h-full flex flex-col z-[3] gap-20">
            <h1 className="text-[210px] leading-none tracking-tighter">Contact</h1>
                <div className="w-full gap-12 flex flex-col ">
                    <h2 className="tracking-tighter text-[38px]">Vous souhaitez être contacter et nous parler de votre projet ?</h2>
                    <p className="tracking-tighter text-[24px]">Remplissez le formulaire ci dessous, notre équipe s&apos;engage à vous contacter sous 48h</p>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
