'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HackHover from './HackHoverEffect'

gsap.registerPlugin(ScrollTrigger)

function Services() {
  const servicesRef = useRef(null)
  const sectionRefs = useRef([])
  const floatingRef = useRef(null)
  const [currentTitle, setCurrentTitle] = useState('')

  useEffect(() => {
    if (!sectionRefs.current.length) return

    // 🔹 Crée un ScrollTrigger par section
    sectionRefs.current.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        onEnter: () => {
          setCurrentTitle(
            section.getAttribute('data-title') ||
              section.querySelector('h2')?.textContent ||
              ''
          )
        },
        onEnterBack: () => {
          setCurrentTitle(
            section.getAttribute('data-title') ||
              section.querySelector('h2')?.textContent ||
              ''
          )
        },
      })
    })

    // 🔹 "Pin" le bloc flottant
    if (floatingRef.current && servicesRef.current) {
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top top',
        end: 'bottom center',
        pin: floatingRef.current,
        pinSpacing: false,
        markers:false,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      className="min-h-screen h-full w-full bg-orange-300 relative overflow-hidden z-[7]"
      id="services"
      ref={servicesRef}
    >
      <HackHover
        data="Services"
        classValue="z-[7] lg:ml-[50px] lg:mt-[50px] w-full h-full text-[14px] lg:text-[120px] leading-none"
      />

      <div className="flex flex-col md:flex-row w-full">
        {/* Colonne gauche sticky avec GSAP */}
        <div className="block w-full md:w-[50vw] relative">
          <div
            ref={floatingRef}
            className="pointer-events-none select-none pl-[50px] pt-[50px]"
          >
            <h1 className=" text-[5vw] md:text-[3.5vw] font-bold tracking-tighter drop-shadow-lg uppercase opacity-80 text-left">
              {currentTitle}
            </h1>
          </div>
        </div>

        {/* Colonne droite avec les services */}
        <div className="w-full md:w-[50vw] md:ml-auto md:pr-8 md:pl-6 py-[120px] flex flex-col gap-[120px] relative z-10">
          {/* Service 1 */}
          <section
            className="service-section flex flex-col items-start gap-6"
            data-title="Design"
            ref={(el) => (sectionRefs.current[0] = el)}
          >
            <h2 className=" text-4xl font-bold">Design</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Identité visuelle</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">UI/UX</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Maquette web</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Direction artistique</span>
            </div>
            <p className=" text-lg">
              Création d&apos;identités visuelles uniques, maquettes web et
              expériences utilisateurs.
            </p>
          </section>

          <div className="w-full border-t h-1 border-black/20 "/>

          {/* Service 2 */}
          <section
            className="service-section flex flex-col items-start gap-6"
            data-title="Développement web"
            ref={(el) => (sectionRefs.current[1] = el)}
          >
            <h2 className= "text-4xl font-bold">Développement web</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Identité visuelle</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">UI/UX</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Maquette web</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Direction artistique</span>
            </div>
            <p className="text-lg">
              Sites vitrines, e-commerce, applications interactives performantes
              et sécurisées.
            </p>
          </section>

          <div className="w-full border-t h-1 border-black/20 " />

          {/* Service 3 */}
          <section
            className="service-section flex flex-col items-start gap-6"
            data-title="Animation de logo"
            ref={(el) => (sectionRefs.current[2] = el)}
          >
            <h2 className= "text-4xl font-bold">Animation de logo</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Identité visuelle</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">UI/UX</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Maquette web</span>
              <span className="bg-white/30 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">Direction artistique</span>
            </div>
            <p className= "text-lg">
              Donnez vie à votre identité avec des animations de logo élégantes
              et mémorables.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Services
