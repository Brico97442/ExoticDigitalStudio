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
      duration: 0,
      ease: "power4.inOut",
      zIndex: 10,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      zIndex: 10,

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
        // Navigue lorsque le voile couvre totalement l'écran.
        // La sortie (retrait du voile) sera animée par animatePageIn dans la nouvelle page.
        router.push(href);
      },
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
      pointerEvents: 'auto',
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
      onComplete: () => {
        gsap.set(overlayRef.current, { visibility: 'hidden', pointerEvents: 'none' })
      }
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

  gsap.fromTo(
    '#about-title',
    { yPercent: 100 }, // valeurs de départ
    {
      yPercent: 0, // valeurs d’arrivée
      ease: "power4.inOut",
      duration: 10,
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "30% 50%",
        scrub: 2,
        markers: false,
      },
    }
  );



  gsap.to(['#hero-scroll , #hero-subtitle , #hero-title , #studio-text ,#coordinates-gps p'], {
    yPercent: 100,
    ease: "power4.inOut",
    duration: 5,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom center",
      scrub: 2,
      markers: false,
    },
  });

};

// Intro sur la page d'accueil après disparition du préloader
export const animateHeroIntro = () => {
  if (typeof window !== 'undefined') {
    if (window.__heroIntroDone) return; // déjà joué
    if (window.__heroIntroTl) {
      try { window.__heroIntroTl.kill(); } catch {}
      window.__heroIntroTl = null;
    }
  }
  const selectors = [
    '#hero-title',
    '#hero-subtitle',
    '#hero-scroll',
    '#studio-text',
    '#coordinates-gps p'
  ];

  const targets = selectors
    .map((s) => document.querySelectorAll(s))
    .flat?.() || [];

  if (!targets || targets.length === 0) {
    return;
  }

  const tl = gsap.timeline();
  if (typeof window !== 'undefined') {
    window.__heroIntroTl = tl;
  }
  tl.set(targets, { y: -100, opacity: 0, visibility: 'hidden', willChange: 'transform, opacity' })
    .to(targets, {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      clearProps: 'transform,opacity,willChange',
      onComplete: () => {
        try {
          window.__heroIntroDone = true;
          window.dispatchEvent(new Event('heroIntroDone'));
          window.__heroIntroTl = null;
        } catch {}
      }
    });
};

export const prepareHeroIntro = () => {
  if (typeof window !== 'undefined' && window.__heroIntroDone) return; // ne pas réinitialiser après lecture
  const selectors = [
    '#hero-title',
    '#hero-subtitle',
    '#hero-scroll',
    '#studio-text',
    '#coordinates-gps p'
  ];
  const targets = selectors
    .map((s) => document.querySelectorAll(s))
    .flat?.() || [];
  if (!targets || targets.length === 0) return;
  gsap.set(targets, { y: -100, opacity: 0, visibility: 'hidden' });
};

//Animation objet 3D Island

export const animateIsland = (island) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      endTrigger: "#gallery-section",
      start: "60% center",
      end: "top 20%",
      scrub: 1,
      markers: false,
    }
  })
  .fromTo("#location-info",
    { opacity: 0, visibility: "hidden" },
    { opacity: 1, visibility: "visible", ease: "power3.inOut", duration: 1 }
  )
  .to("#location-info",
    { 
      opacity: 0,
      ease: "power3.inOut",
      duration: 1,
      onComplete: () => gsap.set("#location-info", { visibility: "hidden" })
    }
  );
  
  
  

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
          y: 0.2,
          z: -0.15,
          duration: 0.4,
          ease: "power1.inOut",
        }
      )

      .to(island.current.position, {
        x: -0.08,
        y: 0.1,
        z: -0.2,
        duration: 0.25,
        ease: "power1.inOut",
      })

      .to(island.current.position, {
        x: -0.1,  // Position finale
        y: 0.12,
        z: -0.25,
        duration: 0.25,
        ease: "power1.inOut",
      })

    gsap.fromTo(island.current.rotation,
      {
        y: -440 * (Math.PI / 180),
        x: 25 * (Math.PI / 180),
      },
      {
        y: -415 * (Math.PI / 180),
        x: 30 * (Math.PI / 180),
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#hero",
          endTrigger: "#about",
          start: "center center",
          end: "center center",
          scrub: 3,
        }
      }
    );


    gsap.to(island.current.material.uniforms.color.value,
      {
        r: 0.5,
        g: 0.1,
        b: 0.4,
        ease: "power1.inOut",
        duration: 6,
        delay: 5,
        scrollTrigger: {
          trigger: "#hero",
          endTrigger: "#about",
          start: "bottom center",
          end: "center center",
          scrub: 1,
          markers: false,
          smoothChildTiming: true,
        }
      }
    );

  }
};

//counter animation
export const animateCounter = (counterRef, onFinish) => {
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
      onComplete: () => {
        gsap.to(counterRef.current, {
          yPercent: -100,
          duration: 1,
          scrub: 1,
          ease: "power4.out",
        });
        if (typeof onFinish === 'function') {
          onFinish();
        }
      }
    });
  }
};

export const animateScene = (divRef) => {
  // Timeline principale pour la scène
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about", // Commence depuis la section about
      endTrigger: "#gallery-section", // Termine dans la section gallery-section
      start: "bottom center", // Commence au milieu de hero
      end: "top 5%", // Termine au milieu de about
      scrub: 1, // Valeur plus élevée pour une animation plus progressive
      markers: false,
      smooth: true, // Lissage de l'animation
    }
  });

  tl.fromTo(divRef.current,
    {
      xPercent: 0,
      opacity: 1,
    },
    {
      xPercent: 0,
      opacity: 0,
      ease: "power3.inOut", // Courbe d'animation plus douce
      immediateRender: true,
    }
  );

};



export const animateAbout = () => {
  gsap.to(["#hero-container"], {
    backgroundColor: "#0E0E0E",
    // duration: 0.2,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "center bottom",
      scrub: 2,
      markers: false,
    }
  });
}


