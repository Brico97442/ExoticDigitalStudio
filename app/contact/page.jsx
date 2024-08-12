import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <section className="flex justify-center items-center w-full h-screen ">
            <div className=" w-full flex flex-col gap-10 z-[3]">
                <div className="w-full gap-6 flex flex-col">
                    <h1 className="text-[8vh] leading-none">Dites m'en un peu plus</h1>
                    <h2>sur votre projet</h2>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
