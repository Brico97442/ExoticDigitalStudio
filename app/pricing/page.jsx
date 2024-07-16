'use client'
import { easeIn, motion } from 'framer-motion';

export default function Pricing() {
    const opacity = { opacity: 1 };

    return (
        <section className="bg-black h-screen w-full">
            <div className="flex pricing text-[20vh] w-full h-full items-center justify-center">
                <motion.div
                    style={{ opacity: 0 }}
                    animate={opacity}
                    transition={{ duration: 2,   delay: 0.3 , ease: easeIn }}
                    >
                    Hello World
                </motion.div>
            </div>
        </section>
    );
}