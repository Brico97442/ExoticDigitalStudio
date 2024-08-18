import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { usePrevious } from 'react-use'
import gsap from 'gsap'
import CarouselItem from './CarouselItem'
import { Text } from '@react-three/drei';

const images = [
    {
        image: '/media/portrait.jpg',
        text: 'Web Site & Co',
        activeText: 'Quand on parle de sites internet, on ne fait pas dans le banal. Ici, chaque projet est unique, taillé sur mesure pour épater vos utilisateurs. Vous voulez une simple landing page qui capte l’attention ? On vous la livre plus accrocheuse qu’un aimant à clics.'
    },
    {
        image: '/media/portrait2.jpg',
        text: 'Référencement Web',
        activeText: 'More about Portrait 2'
    },
    {
        image: '/media/Portrait3.jpg',
        text: 'Service Référencement Web',
        activeText: 'More about Portrait 3'
    },
    {
        image: '/media/shape.jpg',
        text: 'Shape 1',
        activeText: 'More about Shape 1'
    },
    {
        image: '/media/shape2.jpg',
        text: 'Shape 2',
        activeText: 'More about Shape 2'
    },
];



const planeSettings = {
    width: 2.2,
    height: 4,
    gap: 0.3
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
    const speedWheel = 0.1
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
