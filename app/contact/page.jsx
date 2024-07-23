import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <section className="flex justify-center items-center bg-black w-full h-screen">
            <div className=" w-full flex flex-col gap-10">
                <div className="w-full gap-6 flex flex-col">
                    <h1 className="text-[8vh] leading-none">Dites m' un peu à plus</h1>
                    <p >sur votre projet</p>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
