// animation.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'


// Enregistrer le plugin
gsap.registerPlugin(ScrollTrigger);

// ------- Scroll lock helpers (pour transitions de pages) -------
const lockTransitionScroll = () => {
  if (typeof window === 'undefined') return;
  if (window.__transitionScrollLocked) return;
  const body = document.body;
  const html = document.documentElement;
  const y = window.scrollY || window.pageYOffset || 0;
  window.__transitionScrollLocked = true;
  window.__transitionScrollLockY = y;
  body.style.position = 'fixed';
  body.style.top = `-${y}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  // body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
  // html.style.overscrollBehavior = 'none';
};

const unlockTransitionScroll = () => {
  if (typeof window === 'undefined') return;
  if (!window.__transitionScrollLocked) return;
  // Ne pas déverrouiller si le preloader est encore actif
  // if (window.__preloaderDone === false) return;
  const body = document.body;
  const html = document.documentElement;
  const y = Math.abs(parseInt(body.style.top || '0', 10)) || 0;
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';
  // body.style.overflow = '';
  html.style.overflow = '';
  html.style.overscrollBehavior = '';
  // window.scrollTo(0, y);
  window.__transitionScrollLocked = false;
  window.__transitionScrollLockY = 0;
};

//Animation fondu changement de page 
export const animatePageOut = (href, router) => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  const mainEl = document.querySelector('main');

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    lockTransitionScroll();
    try { prepareNavLinksIntro(); } catch {}

    const tl = gsap.timeline();

    // 0️⃣ Slide-out de tous les éléments de la page
    if (mainEl) {
      // const pageElements = mainEl.querySelectorAll('*');
      // tl.to(pageElements, {
      //   y: 100,        // tous les éléments se déplacent vers le bas
      //   opacity: 0,    // facultatif pour un fade en même temps
      //   duration: 0.6,
      //   ease: "power1.inOut",
      //   stagger: 0.02, // légère différence pour un effet plus fluide
      // });
    }

    // 1️⃣ Fade-out du main (si nécessaire)
    if (mainEl) {
      tl.to(mainEl, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
      }, "<"); // "<" pour lancer en parallèle avec le slide
    }

    // 2️⃣ Animation des voiles
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      duration: 0.6,
      ease: "power4.inOut",
      zIndex: 10,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 0.8,
      ease: "power4.inOut",
      stagger: 0.2,
      scrub: 1,
      zIndex: 10,
      onChange:() => {
        // window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      },
      onComplete: () => {
        router.push(href);
      },
    });

    return () => {
      tl.kill();
    };
  }
  // window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};


export const animatePageIn = () => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  const mainEl = document.querySelector('main');

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    // 1️⃣ Animation des voiles qui se retirent
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 0.4,
      ease: "power4.inOut",
      zIndex: 10,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
      duration: 0.4,
      ease: "power4.inOut",
      zIndex: 10,
      onComplete: () => {
        unlockTransitionScroll();
        try { animateNavLinksIntro(); } catch {}
      },
    });

    // 2️⃣ Fade-in du main après le retrait des voiles
    if (mainEl) {
      tl.fromTo(
        mainEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power4.inOut" },
         // légèrement après le début du retrait des voiles
      );
    }
  }
};



//Animation menu overlay 

export const animateOverlayIn = (overlayRef) => {
  if (overlayRef.current) {
    gsap.fromTo(overlayRef.current, {
      y: `${100}%`,
      duration: 0.4,
      visibility: 'hidden',
      opacity: 1,
      ease: [0.76, 0, 0.24, 1],
    }, {
      y: 0,
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
      y: 0,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    }, {
      y: `${100}%`,
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
      y: `${100}%`,
      duration: 0.4,
      stagger: 0.1,
      ease: [0.76, 0, 0.24, 1],
    }, {
      y: `${0}%`,
      duration: 0.4,
      stagger: 0.2,
    })
  }
}

//Hero animation

export const animateHero = (arrowRef) => {
  // if (arrowRef.current) {
  //   gsap.to(arrowRef.current, {
  //     rotation: 45,
  //     ease: "power2.inOut",
  //     scrollTrigger: {
  //       trigger: "#hero",
  //       start: "top top",
  //       end: "bottom center",
  //       scrub: 1,
  //       markers: false,
  //     },
  //   });
  // }

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



  // gsap.to(['#hero-scroll , #hero-subtitle , #hero-title , #studio-text ,#coordinates-gps p'], {
  //   yPercent: 100,
  //   ease: "power4.inOut",
  //   duration: 7,
  //   scrollTrigger: {
  //     trigger: "#hero",
  //     start: "top top",
  //     end: "bottom center",
  //     scrub: 2,
  //     markers: false,
  //   },
  // });

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
  tl.set(targets, { y: 100, opacity: 0, visibility: 'hidden', willChange: 'transform, opacity' })
    .to(targets, {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      duration: 0.6,
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
  if (typeof window !== 'undefined') {
    // Réinitialise le flag pour permettre une relecture quand on revient sur la home
    window.__heroIntroDone = false;
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
  if (!targets || targets.length === 0) return false;
  gsap.set(targets, { y: 100, opacity: 0, visibility: 'hidden' });
  return true;
};

// -------- NavLinks intro (Navbar + Aside) --------
export const prepareNavLinksIntro = () => {
  // const targets = [
  //   ...document.querySelectorAll('#navlink #navigation-link'),
  //   ...document.querySelectorAll('#navlink-menu #navigation-link'),
  //   ...document.querySelectorAll('#logo-link #navigation-link'),
  // ];
  // if (!targets || targets.length === 0) return false;
  // if (typeof window !== 'undefined') {
  //   window.__navLinksIntroDone = false;
  // }
  // gsap.set(targets, { y: 100, opacity: 0, visibility: 'hidden' });
  // return true;
};

export const animateNavLinksIntro = () => {
  // const targets = [
  //   ...document.querySelectorAll('#navlink #navigation-link'),
  //   ...document.querySelectorAll('#navlink-menu #navigation-link'),
  //   ...document.querySelectorAll('#logo-link #navigation-link'),
  // ];
  // if (!targets || targets.length === 0) return;
  // if (typeof window !== 'undefined' && window.__navLinksIntroDone) return;
  // gsap.to(targets, {
  //   y: 0,
  //   opacity: 1,
  //   visibility: 'visible',
  //   duration: 0.3,
  //   ease: 'power4.inOut',
  // });
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
        scrub: true,
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

export const animateIslandIntro = (island) => {
  if (!island?.current) return;
  // Position/rotation/opacité de départ
  const startPosition = { x: -0.08, y: -0.2, z: -0.8 };
  const endPosition = { x: -0.08, y: 0.08, z: -0.3 };
  const startRotation = { x: 15 * (Math.PI / 180), y: -100 * (Math.PI / 180) };
  const endRotation = { x: 25 * (Math.PI / 180), y: -80 * (Math.PI / 180) };

  const tl = gsap.timeline();
  tl.set(island.current, { visible: true })
    .set(island.current.position, startPosition)
    .set(island.current.rotation, startRotation)
    .fromTo(island.current.material.uniforms.opacity, { value: 0 }, { value: 0.04, duration: 0.6, ease: 'power2.out' }, 0)
    .to(island.current.position, { ...endPosition, duration: 2, ease: 'power3.out' }, 0)
    .to(island.current.rotation, { ...endRotation, duration: 2, ease: 'power3.out' }, 0);
};

//counter animation
export const animateCounter = (counterRef, onFinish) => {
  if (counterRef.current) {
    gsap.to(counterRef.current, {
      innerText: 100,
      duration: 5,
      scrub: 2,
      ease: "power1.inOut",
      snap: { innerText: 1 },
      onUpdate: function () {
        counterRef.current.textContent = Math.round(this.targets()[0].innerText);
      },
      onComplete: () => {
        gsap.to(counterRef.current, {
          yPercent: -100,
          duration: 1,
          scrub: 1,
          ease: "power1.inOut",
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
      smooth: false, // Lissage de l'animation
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
  gsap.to(["#main"], {
    backgroundColor: "#0E0E0E",
    // duration: 0.2,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "30% center",
      scrub: 1,
      markers: false,
    }
  });
}

// Fonction pour forcer la réinitialisation des animations hero
export const forceHeroReset = () => {
  // Vérifier si le préloader est actif
  const isPreloaderActive = typeof document !== 'undefined' && (document.body?.classList?.contains('preloading-active') ||  window.__preloaderDone === false);
  
  if (isPreloaderActive) {
    console.log('Préloader actif, réinitialisation différée');
    return;
  }

  const heroElements = [
    '#hero-title',
    '#hero-subtitle', 
    '#hero-scroll',
    '#studio-text',
    '#coordinates-gps p'
  ];
  
  heroElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      gsap.set(el, { 
        y: 0, 
        opacity: 1, 
        visibility: 'visible',
        clearProps: 'transform,opacity,visibility'
      });
    });
  });
  
  // Relancer les animations après réinitialisation
  // setTimeout(() => {
  //   ScrollTrigger.refresh();
  // }, 200);
};


