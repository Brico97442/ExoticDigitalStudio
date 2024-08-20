import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { usePrevious } from 'react-use'
import gsap from 'gsap'
import CarouselItem from './CarouselItem'
import { Text } from '@react-three/drei';

const images = [
    {
        image: '/media/galerie-item-4.jpg',
        text: 'Web Site & Co',
        activeText: `Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Que vous ayez besoin d'une plateforme de e-commerce, d'un portail collaboratif ou d'une application métier, notre équipe d'experts en développement web est à votre service. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.`
    },
    {
        image: '/media/galerie-item-7.jpg',
        text: 'Refonte Site Web',
        activeText: `Si votre site devait participer à un concours de beauté, il serait temps de lui offrir un petit relooking. Notre mission ? Créer un design qui ne se contente pas d’être joli, mais qui fait aussi le boulot. On marie l’esthétique à la fonctionnalité pour que chaque pixel ait du style et chaque clic, du sens. On mélange créativité, esthétique, et une touche de magie pour donner vie à vos idées les plus ambitieuses. Et parce qu’on aime bien faire les choses en grand, on vous livre un design qui reflète non seulement votre identité, mais qui fera aussi jalouser la concurrence. Beau, fonctionnel, mémorable… que demander de plus ? Que vous ayez besoin d’un look minimaliste, d’une touche d’audace, ou d’un design qui fait tourner les têtes, on s’occupe de tout. Avec nous, votre site sera aussi agréable à regarder qu’à utiliser. Parce qu’au final, un bon design, c’est un peu comme une bonne tenue : ça change tout.`
    },
    {
        image: '/media/galerie-item-10.jpg',
        text: 'Référencement Web',
        activeText: `Augmentez votre visibilité sur les moteurs de recherche grâce à notre service de référencement web. Nos experts en SEO optimisent votre site pour qu'il se positionne en tête des résultats de recherche, attirant ainsi plus de visiteurs qualifiés. De l'audit SEO à la stratégie de contenu, en passant par l'optimisation technique et la création de backlinks, nous mettons en œuvre les meilleures pratiques pour assurer une croissance durable de votre trafic organique. Ne laissez pas votre site passer inaperçu : optez pour un référencement web performant et faites de votre présence en ligne un véritable atout`
    },
    {
        image: '/media/bg4.jpg',
        text: 'Design Web',
        activeText: 'More about Shape 1'
    },
    {
        image: '/media/bg5.jpg',
        text: 'Shape 2',
        activeText: 'More about Shape 2'
    },
];



const planeSettings = {
    width: 2.4,
    height: 3.5,
    gap: 0.4
}

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
    duration: 2.5,
    ease: 'power3.out'
})

/*------------------------------
Carousel
------------------------------*/
const Carousel = () => {
    const [$root, setRoot] = useState()
    const [activePlane, setActivePlane] = useState(null)
    const prevActivePlane = usePrevious(activePlane)
    const { viewport } = useThree()
    const textRef1 = useRef()


    /*--------------------
    Vars
    --------------------*/
    const progress = useRef(0)
    const startX = useRef(0)
    const isDown = useRef(false)
    const speedWheel = 0.16
    const speedDrag = -0.2
    const $items = useMemo(() => {
        if ($root) return $root.children
    }, [$root])

    /*--------------------
    Diaplay Items
    --------------------*/
    const displayItems = (item, index, active) => {
        gsap.to(item.position, {
            x: (index - active) * (planeSettings.width + planeSettings.gap),
            y: 0
        })
    }

    /*--------------------
    RAF
    --------------------*/
    useFrame(() => {
        progress.current = Math.max(0, Math.min(progress.current, 100))

        const active = Math.floor((progress.current / 100) * ($items.length - 1))
        $items.forEach((item, index) => displayItems(item, index, active))
    })

    /*--------------------
    Handle Wheel
    --------------------*/
    const handleWheel = (e) => {
        if (activePlane !== null) return
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
        const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX
        progress.current = progress.current + wheelProgress * speedWheel
    }

    /*--------------------
    Handle Down
    --------------------*/
    const handleDown = (e) => {
        if (activePlane !== null) return
        isDown.current = true
        startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
    }

    /*--------------------
    Handle Up
    --------------------*/
    const handleUp = () => {
        isDown.current = false
    }

    /*--------------------
    Handle Move
    --------------------*/
    const handleMove = (e) => {
        if (activePlane !== null || !isDown.current) return
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
        const mouseProgress = (x - startX.current) * speedDrag
        progress.current = progress.current + mouseProgress
        startX.current = x
    }

    /*--------------------
    Click
    --------------------*/
    useEffect(() => {
        if (!$items) return
        if (activePlane !== null && prevActivePlane === null) {
            progress.current = (activePlane / ($items.length - 1)) * 100 // Calculate the progress.current based on activePlane
        }
    }, [activePlane, $items])

    /*--------------------
    Render Plane Events
    --------------------*/
    const renderPlaneEvents = () => {
        return (
            <group>
                <mesh
                    position={[0, 0, -0.01]}
                    onWheel={handleWheel}
                    onPointerDown={handleDown}
                    onPointerUp={handleUp}
                    onPointerMove={handleMove}
                    onPointerLeave={handleUp}
                    onPointerCancel={handleUp}
                >
                    <planeGeometry args={[viewport.width, viewport.height]} />
                    <meshBasicMaterial transparent={true} opacity={0} />
                </mesh>
                
            </group>

        )
    }

    /*--------------------
    Render Slider
    --------------------*/
    const renderSlider = () => {
        return (
            <group ref={setRoot}>
                {images.map((item, i) => (
                    <CarouselItem
                        width={planeSettings.width}
                        height={planeSettings.height}
                        setActivePlane={setActivePlane}
                        activePlane={activePlane}
                        key={item.image}
                        item={item}
                        index={i}
                    />
                ))}
            </group>
        )
    }

    return (
        <group>
            {renderPlaneEvents()}
            {renderSlider()}
        </group>
    )
}

export default Carousel
