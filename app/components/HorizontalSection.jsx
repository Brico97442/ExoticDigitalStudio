import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackHover from "./HackHoverEffect";
import TextReveal from "./TextReveal";

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
        // markers: true, 
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
    <section ref={section2Ref} className="relative">
      <div ref={panelsRef} className="flex w-full">

        {/* section1 */}
        <div className="min-w-[100vw] w-full h-screen flex justify-end items-center relative bg-red-500 text-white text-4xl">
          <HackHover
            data="Nos services"
            classValue="w-auto h-auto text-[14px] lg:text-[280px] leading-none tracking-tighter lg:absolute lg:bottom-[80px] lg:left-[80px]"
          />
          <div className=" w-1/2">
            <TextReveal classValue="text-right max-w-[80%] text-[36px]" staggerValue={"0.03"}>
              <p className="text-right max-w-[80%] text-[36px]">Nous réalisons pour vous des sites sur demandes chaque site conçus par mes soins reflète votre efficacité et votre exigence. </p>
            </TextReveal>
          </div>

        </div>

        {/* section2 */}
        <div className="min-w-[100vw] h-screen flex items-center bg-green-500 lg:p-[80px]">
          <TextReveal classValue="lg:text-[180px]" staggerValue={"0.08"}>
            <h2 className='pointer-events-none tracking-tight lg:text-[180px] text-white'>
              Développement
            </h2>
          </TextReveal>
        </div>

        {/* section3 */}
        <div className="min-w-[100vw] h-screen flex items-center justify-center bg-blue-500 text-white">
          <TextReveal classValue="lg:text-[180px]" staggerValue={"0.08"}>
            <h2 className='pointer-events-none tracking-tight lg:text-[180px] text-white'>
              Design
            </h2>
          </TextReveal>
        </div>

        {/* section4 */}
        <div className="min-w-[100vw] h-screen flex items-center justify-center bg-purple-500 text-white text-4xl">
          Slide 4
        </div>
      </div>
    </section>
  );
}

