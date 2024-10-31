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

//Hero animation

export const animateHero = (arrowRef, textScroll) => {
  if (arrowRef.current && textScroll.current) {
    gsap.to(arrowRef.current, {
      rotation: 45,
      yPercent: -200,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    gsap.to(["#hero-subtitle", "#hero-title", '#coordinates-gps', '#studio-text'], {
      yPercent: -20,
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
      yPercent: -10,
      ease: "power4.inOut",
      duration: 7,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: 2,
        markers: false,
      },
    });


  }
};

//Animation objet 3D Island

export const animateIsland = (island) => {
  if (island?.current) {

    gsap.to(island.current.rotation, {
      y: -60 * (Math.PI / 180), // Demi-rotation autour de l'axe Y (ajustez selon vos besoins)
      x: 50 * (Math.PI / 180), // Demi-rotation autour de l'axe Y (ajustez selon vos besoins)
      duration: 1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#scene',
        start: "top top",
        end: "bottom 60%",
        scrub: 2,
        markers: false,
      }
    });

    gsap.to(island.current.position, {
      x: -0.8,
      y: 0.12,
      z: -0.25,
      duration: 2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#scene',
        start: "40% top",
        end: "bottom 60%",
        scrub: 2,
        markers: false,
      }
    });

    //changer la couleur du shader material
    gsap.to(island.current.material.uniforms.color.value, {
      r: 254,
      g: 254,
      b: 254,
      duration: 2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#scene',
        start: "40% top",
        end: "bottom 60%",
        scrub: 3,
        markers: false,
      }
    });

  }
}

export const animateLocation = (location) => {
  if (location.current) {

    // gsap.to(location.current.rotation, {
    //   y: 20 * (Math.PI / 180), 
    //   scrollTrigger: {
    //     trigger: '#scene',
    //     start: "top top",
    //     end: "80% 60%",
    //     scrub: 2,
    //     markers: false,
    //   }
    // });

    const tl = gsap.timeline();

    // tl.fromTo(
    //   [location.current.material],
    //   { opacity: 0 },
    //   {
    //     opacity: 1,
    //     duration: 2,
    //     ease: "power2.In",
    //     scrollTrigger: {
    //       trigger: '#scene',
    //       start: "top top",
    //       end: "bottom 60%",
    //       scrub: 2,
    //       markers: false,
    //     }

    //   }
    // );

    // Nettoyage timeline 
    return () => {
      tl.kill();
    };
  }
}

// loader animation 


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
  gsap.to(divRef.current, {
    yPercent: 100,
    duration: 2,
    ease: "power1.in",
    scrollTrigger: {
      trigger: divRef.current,
      start: "20% top",
      end: "bottom 60%",
      scrub: 1,
      markers: false,
    }
  });
}

export const animateAbout = () => {
  gsap.to(["#about","#hero"] , {
    backgroundColor: "#000",
    duration: 0.4,
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
  gsap.to(["#about-title", "#target-text", "#target-text-2"], {
    color: "#fff",
    duration: 1,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 2,
      markers: false,
    }
  });

  gsap.fromTo(["#about-title", "#target-text", "#target-text-2"], {
    yPercent:100,
    duration: 3,
    ease: "power1.in",
    opacity:0,
  },{
    yPercent:0,
    duration: 3,
    ease: "power1.in",
    opacity:1,
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      markers: false,
    }
  });
}


