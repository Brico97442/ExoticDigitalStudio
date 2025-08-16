'use client'

import React, { useRef, useEffect, useState } from 'react';
import HackHover from './HackHoverEffect';

function Services() {
  const servicesRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const floatingRef = useRef(null);
  const [floatingStyle, setFloatingStyle] = useState({});

  // Gestion du titre flottant selon la section dont le haut est le plus proche du haut du viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionRefs.current.filter(Boolean);
      if (!sections.length) return;
      let minDist = Infinity;
      let closestTitle = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // On ne prend que les sections dont le haut est visible dans le viewport
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          const dist = Math.abs(rect.top);
          if (dist < minDist) {
            minDist = dist;
            closestTitle = section.getAttribute('data-title') || section.querySelector('h2')?.textContent || '';
          }
        }
      });
      // Si aucune section n'est visible, on prend la dernière visible en bas
      if (!closestTitle) {
        let maxTop = -Infinity;
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.top > maxTop) {
            maxTop = rect.top;
            closestTitle = section.getAttribute('data-title') || section.querySelector('h2')?.textContent || '';
          }
        });
      }
      setCurrentTitle(closestTitle);
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Initial call
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Gestion du pin flottant (fixed/absolute)
  useEffect(() => {
    const handleFloating = () => {
      if (!servicesRef.current || !floatingRef.current) return;
      const sectionRect = servicesRef.current.getBoundingClientRect();
      const floatHeight = floatingRef.current.offsetHeight;
      // Si le haut de la section est au-dessus du viewport et le bas en-dessous du float
      if (sectionRect.top <= 0 && sectionRect.bottom >= floatHeight) {
        setFloatingStyle({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50vw',
          maxWidth: '50vw',
          zIndex: 20,
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        });
      } else if (sectionRect.bottom < floatHeight) {
        // Coller en bas de la section
        setFloatingStyle({
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '50vw',
          maxWidth: '50vw',
          zIndex: 20,
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        });
      } else {
        // Coller en haut de la section
        setFloatingStyle({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50vw',
          maxWidth: '50vw',
          zIndex: 20,
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        });
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleFloating();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Initial call
    handleFloating();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="min-h-screen h-full w-full bg-orange-500 relative overflow-hidden z-[7]"
      id="services"
      ref={servicesRef}
      style={{ position: 'relative' }}
    >
      <HackHover data='Services' classValue='z-[7] lg:ml-[50px] lg:mt-[50px] w-full h-full text-[14px] lg:text-[120px] text-white leading-none' />
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row w-full">
          {/* Colonne gauche sticky */}
          <div className="block w-full md:w-[50vw] relative" style={{ minHeight: '100%' }}>
            {/* Calque flottant qui suit le scroll et se pin en bas */}
            <div
              ref={floatingRef}
              className="pointer-events-none select-none transition-opacity duration-300"
              style={floatingStyle}
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
            >
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">Design</h2>
              <div className="flex flex-row gap-3 flex-wrap mb-2">
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Design</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">UI/UX</span>
                <span className="bg-white/10 text-white text-xs px-4 py-1 rounded-full font-mono tracking-widest uppercase border border-white/20 w-fit">Identité</span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                Création d&apos;identités visuelles uniques, maquettes web et expériences utilisateurs sur-mesure. Un design moderne, immersif et centré sur l&apos;utilisateur pour sublimer votre marque.
              </p>
            </section>

            {/* Séparateur droite */}
            <div className="w-full border-t border-white/20 opacity-60" />

            {/* Service 2 : Développement web */}
            <section
              className="service-section flex flex-col items-start gap-6 group"
              data-title="Développement web"
              ref={(el) => (sectionRefs.current[1] = el)}
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
