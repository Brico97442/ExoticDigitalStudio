import React from 'react'

function Arrow() {
  return (
    <div className=" arrow__body relative  flex justify-center items-center w-[15px] h-[15px]">
     <div className='relative overflow-hidden h-full w-full flex items-center justify-center border-black border-r-2 border-t-2'>
        <div className='bg-black h-[2px] w-[150%] absolute -rotate-45'></div>
     </div>
    </div>
  )
}

export default Arrow
