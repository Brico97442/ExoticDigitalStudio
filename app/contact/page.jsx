import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <section className=" z-60 flex justify-center items-center bg-black w-full h-screen">
            <div className=" w-full flex flex-col gap-10">
                <div className="w-full gap-6 flex flex-col">
                    <h1 className="text-[8vh] leading-none">Dites m'en un peu plus</h1>
                    <h2>sur votre projet</h2>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
