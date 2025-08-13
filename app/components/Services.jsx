'use client'

import React, { useRef, useEffect, useState } from 'react';
import HackHover from './HackHoverEffect';

function Services() {
  const servicesRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const lastScrollYRef = useRef(0);
  const [showFloating, setShowFloating] = useState(false);
  const floatingRef = useRef(null);

  // (Mémo sens de scroll au besoin)
  useEffect(() => {
    const onScroll = () => {
      lastScrollYRef.current = window.scrollY || window.pageYOffset;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Afficher/Cacher + contraindre la balise flottante dans la section orange
  useEffect(() => {
    const onScrollVisibility = () => {
      if (!servicesRef.current) return;
      const rect = servicesRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // Visible seulement quand le haut de la section a atteint le viewport et tant qu'on est dedans
      const engaged = rect.top <= 0 && rect.bottom > 0;
      setShowFloating(engaged);

      // Contraindre la position verticale pour ne jamais sortir de l'orange
      if (floatingRef.current) {
        const floatHeight = floatingRef.current.offsetHeight || 0;
        let topPx = 0; // par défaut collé en haut
        // Si on approche du bas de la section, on colle la balise au bas interne
        if (rect.bottom < floatHeight) {
          topPx = Math.max(0, rect.bottom - floatHeight);
        } else {
          topPx = 0;
        }
        floatingRef.current.style.top = `${topPx}px`;
      }
    };
    window.addEventListener('scroll', onScrollVisibility, { passive: true });
    window.addEventListener('resize', onScrollVisibility);
    onScrollVisibility();
    return () => {
      window.removeEventListener('scroll', onScrollVisibility);
      window.removeEventListener('resize', onScrollVisibility);
    };
  }, []);

  // Observer pour connaître la section active et mettre à jour le titre flottant
  useEffect(() => {
    if (!servicesRef.current) return;

    const sections = sectionRefs.current.filter(Boolean);
    if (!sections.length) return;

    const getEntryScore = (entry) => {
      // Distance du centre de la section au centre du viewport
      const rect = entry.target.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      return Math.abs(sectionCenter - viewportCenter);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => getEntryScore(a) - getEntryScore(b));

        if (visible.length > 0) {
          const target = visible[0].target;
          const title = target.getAttribute('data-title') || target.querySelector('h2')?.textContent || '';
          setCurrentTitle(title);
        } else {
          // Si aucune section n'est suffisamment visible, vider le titre
          setCurrentTitle('');
        }
      },
      { root: null, rootMargin: '0px', threshold: [0.25, 0.5, 0.75] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen h-full w-full bg-orange-500 relative overflow-hidden z-[7]"
      id="services"
      ref={servicesRef}
    >
        <HackHover data='Services' classValue='z-[7] lg:ml-[50px] lg:mt-[50px] w-full h-full text-[14px] lg:text-[120px] text-white leading-none' />
        <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row w-full">
          {/* Colonne gauche sticky */}
          <div className="block w-full md:w-[50vw] relative">
            {/* Calque flottant borné à la section (fixe dans le viewport, masqué hors section) */}
            <div
              className={`pointer-events-none select-none transition-opacity duration-300`}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                maxWidth: '50vw',
                opacity: showFloating ? 1 : 0,
                zIndex: 20,
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '2rem',
                paddingBottom: '2rem',
              }}
              ref={floatingRef}
            >
              <h1 className="text-white text-[5vw] md:text-[3.5vw] font-bold tracking-tighter drop-shadow-lg uppercase opacity-80 text-left">
                {currentTitle}
              </h1>
            </div>
          </div>

          {/* Colonne droite (sections) */}
          <div className="w-full md:w-[50vw] md:ml-auto md:pr-8 md:pl-6 py-[120px] flex flex-col gap-[120px] relative z-10">
            {/* Service 1 : Design */}
            <section
              className="service-section flex flex-col items-start gap-6 group"
              data-title="Design"
              ref={(el) => (sectionRefs.current[0] = el)}
              onMouseEnter={() => setCurrentTitle('Design')}
              onMouseLeave={() => {
                // Revenir au titre de la section visible au scroll si on quitte le hover
                const visibleSection = sectionRefs.current.find(section => {
                  if (!section) return false;
                  const rect = section.getBoundingClientRect();
                  return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
                });
                if (visibleSection) {
                  const title = visibleSection.getAttribute('data-title') || visibleSection.querySelector('h2')?.textContent || '';
                  setCurrentTitle(title);
                } else {
                  setCurrentTitle('');
                }
              }}
            >
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">Design</h2>
              <div className="flex flex-row gap-3 flex-wrap mb-2">
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Design</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">UI/UX</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Identité</span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                Création d'identités visuelles uniques, maquettes web et expériences utilisateurs sur-mesure. Un design moderne, immersif et centré sur l'utilisateur pour sublimer votre marque.
              </p>
            </section>

            {/* Séparateur droite */}
            <div className="w-full border-t border-white/20 opacity-60" />

            {/* Service 2 : Développement web */}
            <section
              className="service-section flex flex-col items-start gap-6 group"
              data-title="Développement web"
              ref={(el) => (sectionRefs.current[1] = el)}
              onMouseEnter={() => setCurrentTitle('Développement web')}
              onMouseLeave={() => {
                // Revenir au titre de la section visible au scroll si on quitte le hover
                const visibleSection = sectionRefs.current.find(section => {
                  if (!section) return false;
                  const rect = section.getBoundingClientRect();
                  return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
                });
                if (visibleSection) {
                  const title = visibleSection.getAttribute('data-title') || visibleSection.querySelector('h2')?.textContent || '';
                  setCurrentTitle(title);
                } else {
                  setCurrentTitle('');
                }
              }}
            >
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">Développement web</h2>
              <div className="flex flex-row gap-3 flex-wrap mb-2">
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Développement</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Web</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Sur-mesure</span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                Sites vitrines, e-commerce, applications interactives : je développe des solutions performantes, rapides et sécurisées, adaptées à vos besoins et à votre image.
              </p>
            </section>

            {/* Séparateur droite */}
            <div className="w-full border-t border-white/20 opacity-60" />

            {/* Service 3 : Animation logo */}
            <section
              className="service-section flex flex-col items-start gap-6 group"
              data-title="Animation de logo"
              ref={(el) => (sectionRefs.current[2] = el)}
              onMouseEnter={() => setCurrentTitle('Animation de logo')}
              onMouseLeave={() => {
                // Revenir au titre de la section visible au scroll si on quitte le hover
                const visibleSection = sectionRefs.current.find(section => {
                  if (!section) return false;
                  const rect = section.getBoundingClientRect();
                  return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
                });
                if (visibleSection) {
                  const title = visibleSection.getAttribute('data-title') || visibleSection.querySelector('h2')?.textContent || '';
                  setCurrentTitle(title);
                } else {
                  setCurrentTitle('');
                }
              }}
            >
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">Animation de logo</h2>
              <div className="flex flex-row gap-3 flex-wrap mb-2">
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Animation</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Logo</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Motion</span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                Donnez vie à votre identité avec des animations de logo élégantes et mémorables. Idéal pour démarquer votre marque sur le web, les réseaux sociaux ou vos vidéos.
              </p>
            </section>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 1s cubic-bezier(.23,1.01,.32,1) both;
        }
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Services;
