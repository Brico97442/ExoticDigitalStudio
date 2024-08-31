import React from 'react'
import Magnetic from '../utils/Magnetic'
import TransitionLink from "../utils/TransitionLink"

function Button({ position }) {
    return (
        <div className={`${position}`}>
            <Magnetic>

                <TransitionLink href="/contact">
                    <div className={`w-full h-full min-w-[130px] flex flex-col relative duration-500 hover:size-20 hover:-rotate-12 :nothover:rotate-12  text-[#771A66] hover:text-black hover:invert transition duration-150 ease-in-out min-h-[30px] justify-center items-center p-2 text-[18px] bg-transparent whitespace-nowrap`} type="submit">Commençer un projet
                       <div className='w-full h-full flex justify-start'><svg width="25" height="20" viewBox="0 0 49 15" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path d="M48.2071 8.20711C48.5976 7.81658 48.5976 7.18342 48.2071 6.79289L41.8431 0.428933C41.4526 0.0384082 40.8195 0.0384082 40.4289 0.428933C40.0384 0.819457 40.0384 1.45262 40.4289 1.84315L46.0858 7.5L40.4289 13.1569C40.0384 13.5474 40.0384 14.1805 40.4289 14.5711C40.8195 14.9616 41.4526 14.9616 41.8431 14.5711L48.2071 8.20711ZM0 8.5H47.5V6.5H0V8.5Z" fill="#771A66" />
                        </svg></div> 
                    </div>
                </TransitionLink>
            </Magnetic>
        </div>
    )
}

export default Button
