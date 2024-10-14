// animation.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

//Animation fondu changement de page 
export const animatePageIn = () => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      zIndex: 10,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
      ease: "power4.inOut",
      zIndex: 10,
      delay: 1,

    });
  }
};

export const animatePageOut = (href, router) => {

  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      duration: 1,
      ease: "power4.inOut",
      zIndex: 10,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.2,
      scrub: 1,
      zIndex: 10,
      onComplete: () => {
        router.push(href);
      },
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      duration: 0.8,
      scrub: 1,
      ease: "power4.inOut",
      zIndex: 10,
      delay: 0.2,
    });
  }
  return () => {
    tl.kill();
  };
};

//Animation menu overlay 

export const animateOverlayIn = (overlayRef) => {
  if (overlayRef.current) {
    gsap.fromTo(overlayRef.current, {
      x: `${100}%`,
      duration: 0.4,
      visibility: 'hidden',
      opacity: 1,
      ease: [0.76, 0, 0.24, 1],
    }, {
      x: 0,
      visibility: 'visible',
      opacity: 1,
      duration: 0.4,

    })
  }
}
export const animateOverlayOut = (overlayRef) => {
  if (overlayRef.current) {
    gsap.fromTo(overlayRef.current, {
      x: 0,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    }, {
      x: `${100}%`,
      duration: 0.4,
    })
  }
}
export const animateOverlayText = (overlayTextRef) => {
  if (overlayTextRef.current) {
    gsap.fromTo(overlayTextRef.current, {
      x: `${100}%`,
      duration: 0.9,
      stagger: 0.1,
      ease: [0.76, 0, 0.24, 1],
    }, {
      x: `${0}%`,
      duration: 0.9,
      stagger: 0.2,
    })
  }
}

export const animateArrow = (arrowRef,textScroll) => {
  if (arrowRef.current && textScroll.current) {
    gsap.to(arrowRef.current, {
      rotation: 45,
      xPercent: -200,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });
    
    gsap.to(["#hero-subtitle", "#hero-title", '#studio-text'], {
      xPercent: -100,
      ease: "power4.inOut",
      duration: 10,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: 2,
        markers: false,
      },
    });
    
    gsap.to('#hero-scroll', {
      yPercent: 100,
      ease: "power4.inOut",
      duration: 10,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: 2,
        markers: false,
      },
    });
    
    gsap.from(textScroll.current, {
      opacity:0,
      ease: "power4.inOut",
      duration: 4,
      delay : 3,
  });
  }
};

//Animation objet 3D Island

export const animateIsland = (island) => {
  if (island?.current && textRef1.current) {
    gsap.to(island.current.position, {
      x: 0,
      y: 0,
      z: -8,
      duration: 2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#scene',
        start: "top top",
        end: "bottom 60%",
        scrub: 1,
        markers: true,
      }
    });
  }
}

export const animateTextScene = (textRef1) => {
  if (textRef1.current) {
    gsap.to(textRef1.current, {
      // opacity: 0,
      duration: 5,
      yoyo: true,
      ease: 'power4.inOut',
    })
  }
}

