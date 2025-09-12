import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const section2Ref = useRef(null);
  const panelsRef = useRef(null);
  const roRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useLayoutEffect(() => {
    const section = section2Ref.current;
    const panels = panelsRef.current;
    if (!section || !panels) return;

    const setSectionHeight = () => {
      // distance horizontale totale à scroller
      const scrollWidth = panels.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalHorizontal = Math.max(0, scrollWidth - viewportWidth);

      // hauteur verticale nécessaire = viewportHeight + distance horizontale
      section.style.height = `${window.innerHeight + totalHorizontal}px`;

      return totalHorizontal;
    };

    // initial
    setSectionHeight();

    const tween = gsap.to(panels, {
      x: () => -(panels.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        id: "horizontal-scroll",
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${panels.scrollWidth - window.innerWidth}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: true, // active pour debug
        onUpdate: self => {
          scrollTriggerRef.current = self;
        }
      },
    });

    // Resize: recalculer hauteur + refresh ScrollTrigger
    const onResize = () => {
      setSectionHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // ResizeObserver sur panels pour gérer chargement d'images / contenu dynamique
    if ("ResizeObserver" in window) {
      roRef.current = new ResizeObserver(() => {
        setSectionHeight();
        ScrollTrigger.refresh();
      });
      roRef.current.observe(panels);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (roRef.current) roRef.current.disconnect();
      tween.kill();
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      // restaurer style
      section.style.height = "";
    };
  }, []);

  return (
    <section ref={section2Ref} className="relative overflow-hidden">
      <div ref={panelsRef} className="flex">
        <div className="min-w-[100vw] h-screen flex items-center justify-center bg-red-500 text-white text-4xl font-bold">
          Slide 1
        </div>
        <div className="min-w-[100vw] h-screen flex items-center justify-center bg-green-500 text-white text-4xl font-bold">
          Slide 2
        </div>
        <div className="min-w-[100vw] h-screen flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
          Slide 3
        </div>
        <div className="min-w-[100vw] h-screen flex items-center justify-center bg-purple-500 text-white text-4xl font-bold">
          Slide 4
        </div>
      </div>
    </section>
  );
}

