import ContactForm from "../components/ContactForm";
import HackHover from "../components/HackHoverEffect";

export default function Contact() {
    return (
        <div className="flex justify-center items-center z-[2]  w-full px-[80px] py-[180px] backdrop-blur-[100px]  bg-opacity-50 ">
            <div className=" w-full h-full flex flex-col z-[3] text-white ">
                <HackHover data='Contact' classValue='text-[17.942rem] text-white tracking-tighter leading-none' />
                <div className="w-full gap-12 flex flex-col ">
                    <h2 className="tracking-tighter text-[2.618rem]">Vous souhaitez être contacter et nous parler de votre projet ?</h2>
                    <p className="tracking-tighter text-[1.618rem]">Remplissez le formulaire ci dessous, notre équipe s&apos;engage à vous contacter sous 48h</p>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
