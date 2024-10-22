// import gsap from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';

// gsap.registerPlugin(ScrollTrigger);

// export const animateTextSimple = (targetRef) => {
//   if (targetRef.current) {

//     elements.forEach((element) => {
//       const splitText = new SplitType(element, { types: 'chars, words' });
//       gsap.from(splitText.words, {
//         yPercent: 100, // Changed from -100 to 100 for bottom-to-top animation
//         opacity: 0,
//         ease: "power4.out", // Changed to .out for a smoother finish
//         duration: 1, // Increased duration for a more visible effect
//         stagger: 0.05, // Reduced stagger for a more cohesive animation
//         scrollTrigger: {
//           trigger: element,
//           start: 'top 80%',
//           end: 'top 20%', // Changed to give more space for the animation
//           scrub: 1,
//           markers: false,
//         }
//       });
//     });
//   }
// };