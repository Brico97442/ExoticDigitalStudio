import React from 'react'
import Magnetic from '../utils/Magnetic'
import TransitionLink from "../utils/TransitionLink"
import Arrow from "../components/Arrow"

function Button({ position,value }) {
    return (
        <div className={`${position}`}>
            {/* <Magnetic> */}
                    <button
                        id='button-cta'
                        className={`flex flex-col py-6 px-8 rounded-full relative overflow-hidden h-[50px] lg:min-w-[300px] border-black hover:border-white transition-all duration-500 ease-in-out border-[1px] justify-center items-center  text-[20px] group`}
                        type="submit"
                    >
                        <div  className='flex z-[1] items-center justify-center gap-2'>
                            <p className='z-[1] relative transition-all duration-500 ease-in-out group-hover:text-white lg:text-[18px]'>{value}</p>
                            <div id='arrow-btn' className=" arrow__body relative  flex justify-center items-center w-[15px] h-[16px]">
                                <div className='relative overflow-hidden h-full w-full flex items-center justify-center border-black group-hover:border-white border-r-2 border-t-2 transition-all duration-500 ease-in-out'>
                                    <div className='bg-black h-[2px] w-[150%] absolute -rotate-45 group-hover:bg-white transition-all duration-500 ease-in-out'></div>
                                </div>
                            </div>
                        </div>

                        <div
                            id='progress-background'
                            className={`absolute rounded-[350px] bottom-0 left-0 w-full h-0 bg-purple-700/50 transition-all duration-500 ease-in-out group-hover:h-full`}
                        >
                        </div>

                    </button>
          {/* </Magnetic> */}
        </div>
    )
}

export default Button