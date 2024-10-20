// animation.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export const animateTextSimple = (target) => {
    if (target.current) {
        gsap.from(target.current, {
            yPercent: 100,
            opacity: 0,
            ease: "power4.inOut",
            visibility: "visible",
            duration: .4,
            stagger: 0.05,  // Adjust the stagger for smoother animation
            delay: 0.6,
            scrollTrigger: {
                trigger: "#about",
                start: 'top 80%',
                end: 'top 25%',
                scrub: true,
                markers: true,
            },
        });
    }
}