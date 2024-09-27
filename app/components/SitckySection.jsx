import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StickySection = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
        }, {
            ease: 'none',
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
                markers: true,
            }
        });

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <div ref={triggerRef} className="relative h-[300vh] bg-red-500 flex flex-col">
            <div ref={sectionRef} className="sticky h-[100px] w-[80vw] bg-blue-500 text-white text-4xl">
                Contenu Sticky
            </div>
        </div>
    );
};

export default StickySection;