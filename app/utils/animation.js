// animation.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type';

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

//Hero animation

export const animateHero = (arrowRef) => {
  if (arrowRef.current) {
    gsap.to(arrowRef.current, {
      rotation: 45,
      // yPercent: -200,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    
    
  }
  gsap.fromTo("#hero-subtitle", {
    yPercent: -100,
    ease: "power4.inOut",
    duration: 4,
  },{
    yPercent: 0,
    ease: "power4.inOut",
    duration: 4,
  });

  
  // gsap.to('#hero-scroll', {
  //   yPercent: 100,
  //   ease: "power4.inOut",
  //   duration: 5,
  //   scrollTrigger: {
  //     trigger: "#hero",
  //     start: "top top",
  //     end: "bottom center",
  //     scrub: 2,
  //     markers: true,
  //   },
  // });
  gsap.fromTo('#hero-scroll', {
    yPercent: 100,
    ease: "power4.inOut",
    duration: 3
  }
  ,{
    yPercent: 0,
    ease: "power4.inOut",
    duration: 3
  }
  );
};

//Animation objet 3D Island

export const animateIsland = (island) => {
  if (island?.current) {
    // Timeline pour contrôler précisément le mouvement de l'île
    const positionTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        endTrigger: "#about",
        start: "center center",
        end: "center center",
        scrub: 2,
        markers: false,
        smoothChildTiming: true,
      }
    });

    // Animation de position progressive avec des points intermédiaires
    positionTL
      .fromTo(island.current.position,
        {
          x: -0.08,
          y: 0.08,
          z: -0.3,
        },
        {
          x: -0.08,  // Premier point intermédiaire
          y: 0.08,
          z: -0.6,
          duration: 0.4,
          ease: "power1.inOut",
        }
      )
      .to(island.current.position, {
        x: -0.08,
        y: 0.08,
        z: -0.65,
        duration: 0.25,
        ease: "power1.inOut",
      })

      .to(island.current.position, {
        x: -0.8,  // Position finale
        y: 0.12,
        z: -0.25,
        duration: 0.25,
        ease: "power1.inOut",
      });


    gsap.fromTo(island.current.rotation,
      {
        y: -440 * (Math.PI / 180),
        x: 25 * (Math.PI / 180),
      },
      {
        y: -60 * (Math.PI / 180),
        x: 50 * (Math.PI / 180),
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#hero",
          endTrigger: "#about",
          start: "center center",
          end: "center center",
          scrub: 2.5,
        }
      }
    );

    gsap.to(island.current.material.uniforms.color.value,
      {
        r: 0.5,   // Valeurs normalisées entre 0 et 1
        g: 0.1,
        b: 0.4,
        ease: "power1.inOut",
        duration: 6,
        delay:5,
        scrollTrigger: {
          trigger: "#hero",
          endTrigger: "#about",
          start: "bottom center",
          end: "center center",
          scrub: 2,
          markers:false,
          smoothChildTiming: true,
        }
      }
    );
  }
};

//counter animation
export const animateCounter = (counterRef) => {
  if (counterRef.current) {
    gsap.to(counterRef.current, {
      innerText: 100,
      duration: 5,
      scrub: 2,
      ease: "power1.in",
      snap: { innerText: 1 },
      onUpdate: function () {
        counterRef.current.textContent = Math.round(this.targets()[0].innerText);
      },
      onComplete:()=>{
        gsap.to(counterRef.current,{
          yPercent: -100,
          duration: 1,
          scrub:1,
          ease: "power4.out",
        })
      }
    });
  }
};

export const animateScene = (divRef) => {
  // Timeline principale pour la scène
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero", // Commence depuis la section hero
      endTrigger: "#about", // Termine dans la section about
      start: "center center", // Commence au milieu de hero
      end: "center center", // Termine au milieu de about
      scrub: 2, // Valeur plus élevée pour une animation plus progressive
      markers: false,
      smooth: true, // Lissage de l'animation
    }
  });

  // Animation progressive de la position Y
  tl.fromTo(divRef.current, 
    {
      yPercent: 0,
      opacity: 1,
    },
    {
      yPercent: 100,
      opacity: 1,
      ease: "power1.inOut", // Courbe d'animation plus douce
      immediateRender: true,
    }
  );
  // gsap.to("#scene" , {
  //   backgroundColor: "#000",
  //   duration: 0.2,
  //   ease: "power1.in",
  //   scrollTrigger: {
  //     trigger: "#about",
  //     start: "top bottom",
  //     end: "center bottom",
  //     scrub: 1,
  //     markers: true,
  //   }
  // });
};



export const animateAbout = () => {
  gsap.to(["#hero-container"] , {
    backgroundColor: "#0E0E0E",
    duration: 0.2,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "center bottom",
      scrub: 1,
      markers: false,
    }
  });
}

export const animateAboutText = () => {
  // gsap.to(["#about-title", "#target-text", "#target-text-2"], {
  //   color: "#fff",
  //   duration: 1,
  //   ease: "power1.in",
  //   scrollTrigger: {
  //     trigger: "#about",
  //     start: "top bottom",
  //     end: "bottom bottom",
  //     scrub: 2,
  //     markers: false,
  //   }
  // });

  // gsap.fromTo(["#about-title", "#target-text", "#target-text-2"], {
  //   yPercent:100,
  //   duration: 3,
  //   ease: "power1.in",
  //   opacity:0,
  // },{
  //   yPercent:0,
  //   duration: 3,
  //   ease: "power1.in",
  //   opacity:1,
  //   scrollTrigger: {
  //     trigger: "#about",
  //     start: "top bottom",
  //     end: "bottom bottom",
  //     scrub: 1,
  //     markers: false,
  //   }
  // });
}


