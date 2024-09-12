import React from 'react'
import Button from './Button'

function PricingCard() {
    return (
        <div className='w-[385px] h-[570px] flex justify-center rounded-[20px] border border-gradient-to-r from-cyan-500 to-blue-500 p-[35px] '>
            <div id='card-text-content' className='flex flex-col items-center gap-[35px]'>
                <h1 className='leading-none text-[30px]'>Création Site Web</h1>
                <ul className='flex flex-col items-center gap-[35px]'>
                    <li>Responsive design</li>
                    <li>Responsive design</li>
                    <li>Responsive design</li>
                    <li>Responsive design</li>
                </ul>
                <p className='text-[32px]'>900€</p>
            </div>
                <Button></Button>
        </div>
    )
}

export default PricingCard
