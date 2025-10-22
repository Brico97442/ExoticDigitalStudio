import React from 'react';
import Button from './Button';

function PricingCard({ title, features, price }) {
    return (
        <div className='relative w-[385px] h-[570px] flex justify-center rounded-[20px] bg-gradient-to-r from-[#669BBC]/50 to-[#C1121F]/50 p-[1px]'>
           <div className='bg-white w-full h-full rounded-[20px] p-[35px] hover:bg-gray-400 transition duration-500'>
           <div id='card-text-content' className='flex flex-col justify-between h-full items-center gap-[35px]'>
                <h1 className='leading-none text-[30px]'>{title}</h1>
                <ul className='flex flex-col items-start gap-[35px]'>
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <p className='text-[32px]'>{price}</p>
                <Button />
            </div>
           </div>
           
        </div>
    );
}

export default PricingCard;
