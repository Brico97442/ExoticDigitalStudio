import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackHover from "./HackHoverEffect";
import TextReveal from "./TextReveal";
import Button from "./Button";

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
    <section ref={section2Ref} className="relative" id="horizontal-section">
      <div
        ref={panelsRef}
        className="flex w-full min-h-screen h-screen"
        style={{ willChange: "transform" }} // GPU optimization
      >
        {/* section1 */}
        <div id="section1" className="min-w-[100vw] w-[100svw] h-screen flex justify-between items-center relative bg-[#070707]">
          <div className="h-full flex flex-col items-end justify-between px-[0px] pb-[0] lg:pt-[80px] lg:px-[80px] lg:pb-[0]">
            <HackHover
              data="Nos services"
              classValue="h-auto w-full text-[2.618rem] lg:text-[17.942rem] mt-[60px] lg:mt-[0px] leading-none tracking-tighter text-white lg:absolute lg:bottom-[0px] left-[0px] lg:left-[80px] "
            />
            <div className="lg:h-3/4 h-full lg:w-1/2 w-full flex items-center justify-end p-[20px] rounded-lg">
              <TextReveal
                classValue="text-right w-full lg:text-[2.618rem] text-white mix-blend-difference "
                staggerValue={"0.03"}
              >
                <p className="text-right w-full max-w-[100%] text-[1.618rem] lg:text-[2.618rem] mix-blend-difference">
                  Des expériences interactives uniques,loin des sites conventionnels. Chaque projet est conçu pour surprendre et séduire, avec un rendu premium.
                </p>
              </TextReveal>
            </div>
          </div>
        </div>

        {/* section2 */}
        <div id="section2" className="min-w-[100vw] gap-[20px] w-screen h-full flex flex-col-reverse justify-between lg:flex-col lg:justify-between bg-[#C1121F]/100 lg:p-[80px] p-[20px]">
          <div className=" flex flex-col justify-between items-end w-full lg:h-auto h-full lg:pt-[120px]">
            <div className="w-full h-full flex flex-col items-end lg:flex-col z-[60]">
              <TextReveal
                classValue=" text-right lg:text-[2.618rem] text-white leading-none h-auto"
                staggerValue={"0.03"}
              >
                <p className=" w-full text-[1.618rem] lg:text-[2.618rem] h-auto lg:mb-[80px] leading-none lg:pl-[1/4]">
                  Je conçois des sites internets, landings pages et web applications performante, Seo friendly. Du site internet moderne à l&apos;intégration 3D.
                </p>
              </TextReveal>
              <hr className="h-[1px] w-full lg:w-1/2 mb-5 mt-5"></hr>
              <div className="flex flex-wrap justify-end gap-2 w-full lg:w-3/6 lg:mb-[80px] lg:mt-[80px]">
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
            <div className="h-auto w-full flex justify-end">
              <Button value='Contact' />
            </div>
          </div>
          <HackHover
            data="Développement"
            classValue="w-auto h-auto text-[2.618rem] lg:text-[11.089rem] leading-none tracking-tighter text-white z-10 mt-[60px] mb-[0px] lg:mt-[0px]"
          />
        </div>

        {/* section3 */}
        <div id="section3" className="min-w-[100vw] gap-[20px] w-screen h-full flex flex-col-reverse justify-between lg:flex-col lg:justify-between bg-[#771A66]/100 lg:p-[80px] p-[20px]">
          <div className=" flex flex-col justify-between items-end w-full lg:h-auto h-full lg:pt-[120px]">
            <div className="w-full h-full flex flex-col lg:flex-col items-end z-[60]">
              <TextReveal
                classValue=" text-right lg:text-[2.618rem] text-white leading-none h-auto"
                staggerValue={"0.03"}
              >
                <p className=" w-full text-[1.618rem] lg:text-[2.618rem] h-auto lg:mb-[80px] leading-none lg:pl-[1/4]">
                  Besoin d&apos;un design pour un site web, landing page ou web applications ?
                </p>
              </TextReveal>
              <hr className="h-[1px] w-full lg:w-1/2 mb-5 mt-5"></hr>
              <div className="flex flex-wrap justify-end gap-2 w-full lg:w-3/6 lg:mb-[80px] lg:mt-[80px]">
              <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out  duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">FIGMA</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Refonte</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Landing Page</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Application Web</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">E-Commerce</span>
              </div>
            </div>
            <div className="h-auto w-full flex justify-end">
              <Button value='Contact' />
            </div>
          </div>
          <HackHover
            data="Design"
            classValue="w-auto h-auto text-[2.618rem] lg:text-[11.089rem] leading-none tracking-tighter text-white z-10 mt-[60px] mb-[0px] lg:mt-[0px]"
          />
        </div>

        {/* section4 */}
        <div id="section4" className="min-w-[100vw] gap-[20px] w-screen h-full flex flex-col-reverse justify-between lg:flex-col lg:justify-between bg-[#072737]/100 lg:p-[80px] p-[20px]">
          <div className=" flex flex-col justify-between items-end w-full lg:h-auto h-full lg:pt-[120px]">
            <div className="w-full h-full flex flex-col lg:flex-col items-end z-[60]">
              <TextReveal
                classValue=" text-right lg:text-[2.618rem] text-white leading-none h-auto"
                staggerValue={"0.03"}
              >
                <p className=" w-full text-[1.618rem] lg:text-[2.618rem] h-auto lg:mb-[80px] leading-none lg:pl-[1/4]">
                  Je conçois des sites internets, landings pages et web applications performante, Seo friendly. Du site internet moderne à l&apos;intégration 3D.
                </p>
              </TextReveal>
              <hr className="h-[1px] w-full lg:w-1/2 mb-5 mt-5"></hr>
              <div className="flex flex-wrap justify-end gap-2 w-full lg:w-3/6 lg:mb-[80px] lg:mt-[80px]">
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out  duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Illustrator</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">After Effect</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">3D Motion</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Application Web</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Flat Design</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Three Fiber</span>
                <span className="hover:bg-[#ECECEC]/70 bg-[#ECECEC]/30 transition-all ease-in-out duration-500 px-3 py-1 rounded-full font-semibold shadow cursor-pointer">Gsap Animation</span>

              </div>
            </div>
            <div className="h-auto w-full flex justify-end">
              <Button value='Contact' />
            </div>
          </div>
          <HackHover
            data="Motion"
            classValue="w-auto text-[2.618rem] lg:text-[11.089rem] leading-none tracking-tighter text-white z-10 mt-[60px] mb-[0px] lg:mt-[0px]"
          />
        </div>
      </div>
    </section>
  );
}
