'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/media/art1.jpg'
import HeroImg2 from '../../public/media/art2.jpg'
import HeroImg3 from '../../public/media/art3.jpg'
import HeroImg4 from '../../public/media/art4.jpg'
import HeroImg5 from '../../public/media/art5.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const containerRef = useRef(null)
    const imagesContainerRef = useRef(null)

    const pictures = [
        { src: HeroImg, width: '12.5vw', height: '12.5vh', top: '0%', left: '0px', scale: 8, zIndex: 10, filter: 'grayscale(100%)' },
        { src: HeroImg2, width: '20vw', height: '32vh', top: '-86px', left: '-20vw', scale: 6, zIndex: 1 },
        { src: HeroImg3, width: '20vw', height: '32vh', top: '86px', left: '20vw', scale: 5, zIndex: 1 },
        { src: HeroImg4, width: '40vw', height: '15vh', top: '-18vh', left: '14vw', scale: 4, zIndex: 1 },
        { src: HeroImg5, width: '40vw', height: '15vh', top: '18vh', left: '-14vw', scale: 7, zIndex: 1 },
    ]

    useEffect(() => {
        // Créer une animation pour que toutes les images changent de taille simultanément
        gsap.to(imagesContainerRef.current.children, {
            scale: (index, target) => pictures[index].scale,  // Appliquer la valeur de scale spécifique à chaque image
            duration: 2,  
            ease: "linear",  // Courbe d'assouplissement
            scrollTrigger: {
                trigger: containerRef.current,
                start: "38% 49%",
                end: "48% 50%",
                scrub: 2,
                markers: false,
            },
        })
        const grayscaleImage = imagesContainerRef.current.children[1] 
        if(grayscaleImage){
            gsap.to(grayscaleImage, {
                filter: 'grayscale(0%)',  // Animer pour faire disparaître le filtre
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "50% 49%",
                    end: "50% 50%",  // Point de fin de l'animation
                    scrub: 2,          // Synchroniser avec le défilement
                },
            })
        }
       
    }, [])

    return (
        <div className='sticky z-[1] h-[150vh] relative flex flex-col justify-center  ' ref={containerRef}>
            <div className=' top-0  h-[130vh] flex items-center overflow-hidden'>
                <div className='h-full w-full relative flex items-center justify-center pt-[-20vh] ' ref={imagesContainerRef}>
                    {pictures.map((picture, index) => (
                        <div className='flex items-center justify-center h-full w-full top-0 absolute' key={index} style={{ zIndex: picture.zIndex }} >
                            <div
                                className='image-container relative'
                                style={{
                                    width: picture.width,
                                    height: picture.height,
                                    top: picture.top,
                                    left: picture.left,
                                    filter: picture.filter || 'none'  // Appliquer le filtre si défini, sinon aucun filtre

                                }}
                            >
                                <Image
                                    src={picture.src}
                                    alt={`oeuvre photographique ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    placeholder="blur"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
// 'use client'
// import React, { useRef, useEffect } from 'react'
// import Image from 'next/image'
// import HeroImg from '../../public/media/art1.jpg'
// import HeroImg2 from '../../public/media/art2.jpg'
// import HeroImg3 from '../../public/media/art3.jpg'
// import HeroImg4 from '../../public/media/art4.jpg'
// import HeroImg5 from '../../public/media/art5.jpg'
// import { useScroll, useTransform, motion } from 'framer-motion'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/all';


// gsap.registerPlugin(ScrollTrigger)

// export default function Hero({ }) {
//   const container = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ['start start', 'end end']
//   });

//   const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
//   const scale5 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);
//   const scale6 = useTransform(scrollYProgress, [0, 1], [0.7, 4]);
//   const scale7 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);
//   const scale8 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);

//   const target = useRef(null)
//   const target2 = useRef(null)


//   useEffect(() => {
//     // gsap.fromTo(['#hero-title'], {
//     //   y: 200,
//     //   opacity: 0,
//     //   bottom: 0
//     // },
//     //   {
//     //     y: 0,
//     //     opacity: 1,
//     //     ease: "power4.inOut",
//     //     visibility: "visible",
//     //     duration: 2,
//     //     stagger: 0.2,
//     //     delay: 1,
//     //     zIndex: 2
//     //   });

//     // gsap.fromTo(['.title-text', '#hero-button'], {
//     //   x: -200,
//     //   opacity: 0,
//     //   bottom: 0
//     // },
//     //   {
//     //     x: 0,
//     //     opacity: 1,
//     //     ease: "power4.inOut",
//     //     visibility: "visible",
//     //     duration: 2,
//     //     stagger: 0.2,
//     //     delay: 2,
//     //     zIndex: 2
//     //   });

//     // gsap.fromTo(target.current, {
//     //   xPercent: 200,
//     //   opacity: 0,
//     // }, {
//     //   xPercent: 0,
//     //   opacity: 1,
//     //   duration: 2,

//     //   scrollTrigger: {
//     //     trigger: target.current,
//     //     markers: false,
//     //     start: '-50% 50% ',
//     //     end: 'bottom 70%',
//     //     toggleActions: 'play none none reverse',
//     //   },
//     // }
//     // )
//     // gsap.fromTo(target2.current, {
//     //   translateZ: `${100}vh`,
//     //   opacity: 0,
//     // }, {
//     //   translateZ: `${0}vh`,
//     //   opacity: 1,
//     //   ease: 'power4.inOut',
//     //   duration: 2,

//     //   scrollTrigger: {
//     //     trigger: target2.current,
//     //     markers: false,
//     //     start: '-50% 50% ',
//     //     end: 'bottom 70%',
//     //     toggleActions: 'play none none reverse',
//     //   },
//     // })
//   }, []);


//   const pictures = [
//     {
//       src: HeroImg,
//       scale: scale4
//     },
//     {
//       src: HeroImg2,
//       scale: scale5
//     },
//     {
//       src: HeroImg3,
//       scale: scale6
//     },
//     {
//       src: HeroImg4,
//       scale: scale7
//     },
//     {
//       src: HeroImg5,
//       scale: scale8
//     },

//   ]
//   return (

//     <div id='hero' className='hero w-full text-white z-[1] bg-[#0E0E0E]'>
//       {/* <HorizontalScroll/> */}
//       <div className='h-screen flex w-[85vw] m-auto z-[1]'>
//         <div className=' w-full flex justify-end items-center '>
//         <h2 className='text-[4em] w-1/2 leading-none text-right' >Créez le Futur du Web Innovation, Design et Magie Numérique</h2>
//         </div>
//       </div>
//       <div className="flex h-[250vh] relative w-full " ref={container}>
//                 <div className="parrallaxe flex h-screen w-full top-0 sticky " >
//           {
//             pictures.map(({ src, scale }, index) => {
//               return <motion.div style={{ scale }} transition={{ type: 'inertia', velocity: 200 }} key={index} className="el flex items-center justify-center h-full w-full top-0 absolute">
//                 <div className="relative w-[25vw] h-[25vh] image-container">
//                   <Image
//                     src={src}
//                     alt="oeuvre photographique d'une femme"
//                     fill
//                     placeholder="blur"
//                     objectFit='cover'
//                   />
//                 </div>
//               </motion.div>
//             })
//           }
//         </div>

//       </div>
//     </div>
//   );
// }
