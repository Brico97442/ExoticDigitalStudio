// animation.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


// export const animateTextSimple = () => {
//   if () {
//     gsap.from({
//       scrollTrigger: {
//           trigger: textRef.current,
//           start: 'top 80%',
//           end: 'top 25%',
//           scrub: true,
//           markers: false,
//       },
//       y: `${100}vh`,
//       opacity: 0,
//       ease: "power4.inOut",
//       visibility: "visible",
//       duration: .4,
//       stagger: 0.05,  // Adjust the stagger for smoother animation
//       delay: 0.6
//   });
//   }
// }