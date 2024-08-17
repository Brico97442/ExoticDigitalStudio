import React from 'react'

function Button({ position }) {
    return (
            <button id='hero-button' className={`${position} cursor-pointer bg-gradient-to-b from-[#D90429]/50 to-[#2B2D42]/50 w-full h-full text-[18px] leading-none border border-[1px] font-bold border-black max-w-[150px] max-h-[150px] rounded-full p-2`}>Commencer <br />un projet</button>
    )
}

export default Button
