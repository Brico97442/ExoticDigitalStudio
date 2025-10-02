// animation.js - Version complète avec tous les exports
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Détection mobile
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

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
  html.style.overflow = 'hidden';
};

const unlockTransitionScroll = () => {
  if (typeof window === 'undefined') return;
  if (!window.__transitionScrollLocked) return;
  const body = document.body;
  const html = document.documentElement;
  const y = Math.abs(parseInt(body.style.top || '0', 10)) || 0;
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';
  html.style.overflow = '';
  html.style.overscrollBehavior = '';
  window.__transitionScrollLocked = false;
  window.__transitionScrollLockY = 0;
};

// Animation fondu changement de page 
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

    // Fade-out du main
    if (mainEl) {
      tl.to(mainEl, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
      }, "<");
    }

    // Animation des voiles
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
      onComplete: () => {
        router.push(href);
      },
    });

    return () => {
      tl.kill();
    };
  }
};

// ⚠️ FONCTION MANQUANTE - À EXPORTER
export const animatePageIn = () => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  const mainEl = document.querySelector('main');

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    // Animation des voiles qui se retirent
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

    // Fade-in du main après le retrait des voiles
    if (mainEl) {
      tl.fromTo(
        mainEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power4.inOut" },
      );
    }
  }
};

// Animation menu overlay 
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

// Hero animation
export const animateHero = (arrowRef) => {
  const config = isMobile() ? 
    { ease: "power2.inOut", duration: 5, scrub: 1 } : 
    { ease: "power4.inOut", duration: 10, scrub: 2 };

  gsap.fromTo(
    '#about-title',
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: config.ease,
      duration: config.duration,
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "30% 50%",
        scrub: config.scrub,
        markers: false,
      },
    }
  );
};

// Intro sur la page d'accueil après disparition du préloader
export const animateHeroIntro = () => {
  if (typeof window !== 'undefined') {
    if (window.__heroIntroDone) return;
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
      duration: isMobile() ? 0.4 : 0.6,
      ease: 'power3.out',
      stagger: isMobile() ? 0.05 : 0.08,
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

// NavLinks intro
export const prepareNavLinksIntro = () => {
  // Fonction vide pour éviter les erreurs
};

export const animateNavLinksIntro = () => {
  // Fonction vide pour éviter les erreurs
};

// Animation objet 3D Island
export const animateIsland = (island) => {
  if (!island?.current) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      endTrigger: "#gallery-section",
      start: "60% center",
      end: "top 20%",
      scrub: isMobile() ? 0.5 : 1,
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

  // Animation de position optimisée pour mobile
  const positionTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      endTrigger: "#about",
      start: "center center",
      end: "center center",
      scrub: isMobile() ? 0.5 : true,
      markers: false,
      smoothChildTiming: !isMobile(),
    }
  });

  if (isMobile()) {
    // Version simplifiée pour mobile
    positionTL.fromTo(island.current.position,
      { x: -0.08, y: 0.08, z: -0.3 },
      { x: -0.1, y: 0.12, z: -0.25, duration: 1, ease: "power1.inOut" }
    );
  } else {
    // Version complète pour desktop
    positionTL
      .fromTo(island.current.position,
        { x: -0.08, y: 0.08, z: -0.3 },
        { x: -0.08, y: 0.2, z: -0.15, duration: 0.4, ease: "power1.inOut" }
      )
      .to(island.current.position, {
        x: -0.08, y: 0.1, z: -0.15, duration: 0.25, ease: "power1.inOut"
      })
      // .to(island.current.position, {
      //   x: -0.1, y: 0.12, z: -0.25, duration: 0.25, ease: "power1.inOut"
      // });
  }

  // Animation rotation
  gsap.fromTo(island.current.rotation,
    {
      y: -80 * (Math.PI / 180),
      x: 25 * (Math.PI / 180),
    },
    {
      y: -60 * (Math.PI / 180),
      x: 30 * (Math.PI / 180),
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#hero",
        endTrigger: "#about",
        start: "center center",
        end: "center center",
        scrub: isMobile() ? 1 : 3,
      }
    }
  );

  // Animation couleur (désactivée sur mobile)
  if (island.current.material?.color) {
    // Couleur cible #072737
    const targetColor = new THREE.Color('#072737');
  
    gsap.to(island.current.material.color, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      ease: "power1.inOut",
      duration: 0.5,
      delay: 5,
      scrollTrigger: {
        trigger: "#hero",
        endTrigger: "#about",
        start: "bottom center",
        end: "center center",
        scrub: 1,
        markers: false,
      }
    });
  }
};

export const animateIslandIntro = (island) => {
  if (!island?.current) return;
  
  const startPosition = { x: -0.08, y: -0.3, z: -0.8 };
  const endPosition = { x: -0.08, y: 0.08, z: -0.3 };
  const startRotation = { x: 15 * (Math.PI / 180), y: -100 * (Math.PI / 180) };
  const endRotation = { x: 25 * (Math.PI / 180), y: -80 * (Math.PI / 180) };

  const tl = gsap.timeline();
  tl.set(island.current, { visible: true })
    .set(island.current.position, startPosition)
    .set(island.current.rotation, startRotation)
    .fromTo(
      island.current.material, 
      { opacity: 0 }, 
      { opacity: 1, duration: isMobile() ? 0.4 : 0.6, ease: 'power2.out' }, 
      0
    )
    .to(island.current.position, { 
      ...endPosition, 
      duration: isMobile() ? 1 : 2, 
      ease: 'power3.out' 
    }, 0)
    .to(island.current.rotation, { 
      ...endRotation, 
      duration: isMobile() ? 1 : 2, 
      ease: 'power3.out' 
    }, 0);
};

// Animation couleur

// Counter animation
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
  if (!divRef.current) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      endTrigger: "#gallery-section",
      start: "bottom center",
      end: "top 5%",
      scrub: isMobile() ? 0.5 : 1,
      markers: false,
      smooth: !isMobile(),
    }
  });

  tl.fromTo(divRef.current,
    { opacity: 1 },
    { 
      
      opacity: 0, 
      ease: isMobile() ? "power2.inOut" : "power3.inOut",
      // immediateRender: true,
    }
  );
};

export const animateAbout = () => {
  gsap.to(["#main"], {
    backgroundColor: "#ECECEC",
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "30% center",
      scrub: isMobile() ? 0.5 : 1,
      markers: false,
    }
  });
}

// Fonction pour forcer la réinitialisation des animations hero
export const forceHeroReset = () => {
  const isPreloaderActive = typeof document !== 'undefined' && (document.body?.classList?.contains('preloading-active') || window.__preloaderDone === false);
  
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
};