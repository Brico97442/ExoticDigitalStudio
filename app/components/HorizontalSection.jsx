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
        className="flex w-full min-h-screen h-screen"
        style={{ willChange: "transform" }} // GPU optimization
      >
        {/* section1 */}
        <div className="min-w-[100vw] w-[100svw] h-screen flex justify-end items-center relative bg-[#070707]">
          <div className="h-full flex flex-col justify-between p-[20px] lg:p-[80px]">
            <HackHover
              data="Nos services"
              classValue="h-auto text-[64px] lg:text-[280px] mt-[60px] lg:mt-[0px] leading-none tracking-tighter text-white lg:absolute lg:bottom-[80px] lg:left-[80px]"
            />
            <div className="lg:h-3/4 h-full lg:w-1/2 flex items-center justify-center">
              <TextReveal
                classValue="text-right w-auto lg:text-[36px] text-white"
                staggerValue={"0.03"}
              >
                <p className="text-right max-w-[100%] text-[24px] lg:text-[36px]">
                  Des expériences interactives uniques, loin des sites conventionnels. Chaque projet est conçu pour surprendre et séduire, avec un rendu haut de gamme.
                </p>
              </TextReveal>
            </div>
          </div>
        </div>

        {/* section2 */}
        <div className="min-w-[100vw] w-screen h-[100dvh] flex flex-col-reverse justify-between lg:flex-col lg:justify-end bg-[#C1121F]/90 lg:p-[80px] p-[20px]">
          <div className=" flex flex-col justify-between items-end w-full lg:h-3/4 h-full">
            <TextReveal
              classValue=" text-right lg:text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className=" w-auto text-[24px] lg:text-[36px] lg:mb-[80px]">
                Des conception sur demandes inspirantes exigentes.
              </p>
            </TextReveal>
            <hr className="h-[1px] w-full lg:w-1/2 mb-5 mt-5"></hr>
            <div className="flex flex-wrap justify-start gap-2 w-full lg:w-3/6 lg:mb-[80px] lg:mt-[80px]">
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out  duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Site Internet</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Refonte</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Landing Page</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Immersion 3D</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Application Web</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">E-Commerce</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">React Js</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Next Js</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Wordpress</span>
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Webflow</span>
            </div>
          </div>
          <HackHover
            data="Développement"
            classValue="w-auto h-auto text-[48px] lg:text-[11.089rem] leading-none tracking-tighter text-white z-10 mt-[60px] mb-[60px] mb-[60px] lg:mt-[0px]"
          />
        </div>

        {/* section3 */}
        <div className="min-w-[100vw] w-screen h-[100dvh] flex flex-col-reverse lg:flex-col justify-between lg:justify-end bg-[#072737] lg:p-[80px] p-[20px]">
          <div className=" flex flex-col justify-between items-end w-full lg:h-3/4 h-full">
            <TextReveal
              classValue="text-right  lg:text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className=" w-auto text-[24px] lg:text-[36px] lg:mb-[80px]">
                Nous réalisons pour vous des sites sur demandes chaque site
                conçus par mes soins reflète votre efficacité et votre
                exigence.
              </p>
            </TextReveal>
            <hr className="h-[1px] w-full lg:w-1/2 mb-5 mt-5"></hr>
            <div className="flex flex-wrap justify-end gap-2 w-full lg:mb-[80px] lg:mt-[80px]">
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Identité visuelle</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">UI/UX</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Maquette web</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Figma</span>
            </div>
          </div>
          <HackHover
            data="Design"
            classValue="w-auto h-auto text-[48px] lg:text-[11.089rem] leading-none tracking-tighter text-white mt-[60px] mb-[60px] lg:mt-[0px] "
          />
        </div>

        {/* section4 */}
        <div className="min-w-[100vw] w-screen h-screen flex flex-col-reverse lg:flex-col justify-end bg-[#771A66] lg:p-[80px] p-[20px]">
          <div className=" flex flex-col justify-between items-end w-full lg:h-3/4 h-full">
            <TextReveal
              classValue="text-right lg:text-[36px] text-white"
              staggerValue={"0.03"}
            >
              <p className=" w-auto text-[24px] lg:text-[36px] mb-[80px]">
                Nous réalisons pour vous des sites sur demandes chaque site
                conçus par mes soins reflète votre efficacité et votre
                exigence.
              </p>
            </TextReveal>
            <hr className="h-[1px] mb-5 mt-5 w-full lg:w-1/2"></hr>
            <div className="flex flex-wrap justify-end gap-2 w-full lg:mb-[80px] lg:mt-[80px]">
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Gsap</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Motion design</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Three Fiber</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Three Js</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Webgl</span>
              <span className="bg-[#ECECEC]/70 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">After Effect</span>
            </div>
          </div>
          <HackHover
            data="Motion"
            classValue="w-auto h-auto text-[48px] lg:text-[11.089rem] leading-none tracking-tighter text-white mt-[60px] mb-[60px] lg:mt-[0px] "
          />
        </div>
      </div>
    </section>
  );
}
