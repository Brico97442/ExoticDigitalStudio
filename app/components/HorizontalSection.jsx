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

    // --- Fonction pour définir la hauteur du section ---
    const setSectionHeight = () => {
      const scrollWidth = panels.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalHorizontal = Math.max(0, scrollWidth - viewportWidth);
      section.style.height = `${window.innerHeight + totalHorizontal}px`;
      return totalHorizontal;
    };

    // --- Optimisation refresh avec requestAnimationFrame ---
    let refreshPending = false;
    const refreshScrollTrigger = () => {
      if (!refreshPending) {
        refreshPending = true;
        requestAnimationFrame(() => {
          setSectionHeight();
          ScrollTrigger.refresh();
          refreshPending = false;
        });
      }
    };

    // --- Initialisation hauteur ---
    setSectionHeight();

    // --- Création tween GSAP ---
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
        onUpdate: (self) => (scrollTriggerRef.current = self),
        // markers: true,
      },
    });

    // --- Resize listener ---
    const onResize = refreshScrollTrigger;
    window.addEventListener("resize", onResize);

    // --- ResizeObserver optimisé ---
    if ("ResizeObserver" in window) {
      let previousScrollWidth = panels.scrollWidth;
      roRef.current = new ResizeObserver(() => {
        if (panels.scrollWidth !== previousScrollWidth) {
          previousScrollWidth = panels.scrollWidth;
          refreshScrollTrigger();
        }
      });
      roRef.current.observe(panels);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (roRef.current) roRef.current.disconnect();
      tween.kill();
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      section.style.height = "";
    };
  }, []);

  return (
    <section ref={section2Ref} className="relative">
      <div
        ref={panelsRef}
        className="flex w-full"
        style={{ willChange: "transform" }} // GPU optimization
      >
        {/* section1 */}
        <div className="min-w-[100vw] w-full h-screen flex justify-end items-center relative bg-[#070707] text-4xl">
          <HackHover
            data="Nos services"
            classValue="w-auto h-auto text-[14px] lg:text-[280px] leading-none tracking-tighter text-white lg:absolute lg:bottom-[80px] lg:left-[80px] "
          />
          <div className="w-1/2">
            <TextReveal
              classValue="text-right max-w-[80%] text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className="text-right max-w-[80%] text-[36px]">
                Nous réalisons pour vous des sites sur demandes chaque site
                conçus par mes soins reflète votre efficacité et votre
                exigence.
              </p>
            </TextReveal>
          </div>
        </div>

        {/* section2 */}
        <div className="min-w-[100vw] h-screen flex flex-col justify-end bg-[#C1121F]/90 lg:p-[80px] ">
          <div className=" flex flex-col items-end w-full">

            <TextReveal
              classValue="text-right max-w-[100%] text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className=" max-w-[100%] text-[36px] mb-[80px]">
                Nous réalisons pour vous des sites sur demandes chaque site
                conçus par mes soins reflète votre efficacité et votre
                exigence.
              </p>
            </TextReveal>
            <hr className="h-[1px] w-1/2 mb-5 mt-5"></hr>
            <div className="flex flex-wrap justify-end gap-2 w-full mb-[80px] mt-[80px]">
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Identité visuelle</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">UI/UX</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Maquette web</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Direction artistique</span>
            </div>
            <div>
            </div>
          </div>
          <HackHover
            data="Développement"
            classValue="w-auto h-auto text-[14px] lg:text-[11.089rem] leading-none tracking-tighter text-white  lg:bottom-[80px] lg:left-[80px] "
          />
        </div>

        {/* section3 */}
        <div className="min-w-[100vw] h-screen flex flex-col justify-end bg-[#072737] lg:p-[80px] ">
          <div className=" flex flex-col items-end w-full">

            <TextReveal
              classValue="text-right max-w-[100%] text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className=" max-w-[100%] text-[36px] mb-[80px]">
                Nous réalisons pour vous des sites sur demandes chaque site
                conçus par mes soins reflète votre efficacité et votre
                exigence.
              </p>
            </TextReveal>
            <hr className="h-[1px] w-1/2 mb-5 mt-5"></hr>
            <div className="flex flex-wrap justify-end gap-2 w-full mb-[80px] mt-[80px]">
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Identité visuelle</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">UI/UX</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Maquette web</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Direction artistique</span>
            </div>
            <div>
            </div>
          </div>
          <HackHover
            data="Design"
            classValue="w-auto h-auto text-[14px] lg:text-[11.089rem] leading-none tracking-tighter text-white  lg:bottom-[80px] lg:left-[80px] "
          />
        </div>

        {/* section4 */}
        <div className="min-w-[100vw] h-screen flex flex-col justify-end bg-[#771A66] lg:p-[80px] ">
          <div className=" flex flex-col items-end w-full">

            <TextReveal
              classValue="text-right max-w-[100%] text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className=" max-w-[100%] text-[36px] mb-[80px]">
                Nous réalisons pour vous des sites sur demandes chaque site
                conçus par mes soins reflète votre efficacité et votre
                exigence.
              </p>
            </TextReveal>
            <hr className="h-[1px] w-1/2 mb-5 mt-5"></hr>
            <div className="flex flex-wrap justify-end gap-2 w-full mb-[80px] mt-[80px]">
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Identité visuelle</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">UI/UX</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Maquette web</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Direction artistique</span>
            </div>
            <div>
            </div>
          </div>
          <HackHover
            data="Motion"
            classValue="w-auto h-auto text-[14px] lg:text-[11.089rem] leading-none tracking-tighter text-white  lg:bottom-[80px] lg:left-[80px] "
          />
        </div>
      </div>
    </section>
  );
}
