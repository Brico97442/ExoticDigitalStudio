import React, { useEffect, useRef } from 'react'

function Lines({strokeColor}) {

    const path = useRef(null)
    let progress = 0;
    let time = Math.PI / 2;
    let reqId = null;
    let x = 0.5;

    useEffect(() => {
        setPath(progress)
    }, [])

    const setPath = (progress) => {
        const { innerWidth } = window;
        const width = innerWidth * 0.8;
        path.current.setAttributeNS("", "d", `M0 50 Q ${width*x} ${50 + progress}, ${width} 50`)
    }


    const manageMouseEnter = (e) => {
        if (reqId) {
            window.cancelAnimationFrame(reqId)
            resetAnimation()
        }
    }

    const manageMouseMove = (e) => {
        const { movementY, clientX } = e;
        const {left,width} = path.current.getBoundingClientRect();
        x = ( clientX - left ) / width
        progress += movementY
        setPath(progress)
    }

    const manageMouseLeave = (e) => {
        animateOut()
    }


    const lerp = (x, y, a) => x * (1 - a) + y * a
    const animateOut = () => {
        const newProgress = progress * Math.sin(time)
        time += 0.2;
        setPath(newProgress)
        progress = lerp(progress, 0, 0.025)

        if (Math.abs(progress) > 0.75) {

            window.requestAnimationFrame(animateOut)
        } else {
            resetAnimation()
        }
    }

    const resetAnimation = (e) => {
        time = Math.PI / 2;
        progress = 0;
    }

    return (
        <div className='h-[1px] w-full relative mb-20 z-[2]'>
            <div onMouseEnter={manageMouseEnter} onMouseMove={manageMouseMove} onMouseLeave={manageMouseLeave} className='z-[3] box h-[40px] relative top-[-20px] hover:h-[150px] hover:top-[-75px]'></div>
            <svg fill='none' className='flex items-center bg-transparent h-[100px] top-[-50px] absolute overflow-visible '>
                <path className={`stroke-[1px] ${strokeColor}  w-full`} ref={path}>
                </path>
            </svg>
        </div>
    )
}

export default Lines
