'use client'
import { animatePageIn } from "./animation"
import { useEffect } from "react"

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn()
  }, [])
  return (
    <div className="flex flex-row ">
      <div id='banner-1'
        className='min-h-screen bg-neutral-950 fixed top-0 left-0 w-1/4 text-white'>
      </div>
      <div id='banner-2'
        className='min-h-screen bg-neutral-950 fixed top-0 left-1/4 w-1/4'>
      </div>
      <div id='banner-3'
        className='min-h-screen bg-neutral-950 fixed top-0 left-2/4 w-1/4'>
      </div>
      <div id='banner-4'
        className='min-h-screen bg-neutral-950 fixed top-0 left-3/4 w-1/4'>
      </div>
      {children}
    </div>
  )
}
