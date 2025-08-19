import React, { useState } from 'react'
import Image from 'next/image'
import logo from "../../assets/LogoExoticDigitalStudioWhiteVectorised.webp"
// Importez votre SVG comme ReactComponent si vous utilisez un bundler comme webpack ou directement comme source.
import Lines from './Lines'
import Magnetic from '../utils/Magnetic'
import TextReveal from './TextReveal'
import TransitionLink from '../utils/TransitionLink'

function Footer() {
    const [isCopied, setIsCopied] = useState(false);

    function copyText() {
        const copyButton = document.getElementById("copy-text-btn");
        if (copyButton) {
            navigator.clipboard.writeText(copyButton.value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000); // Masquer le message après 3 secondes
        }
    }


    return (
        <footer id='footer' className='flex h-[60vh]  justify-center items-center border-none text-white w-full bg-[#003049]  z-[2] relative' style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>

            <div className='fixed bottom-0 flex flex-col lg:flex-row h-[60vh] text-white items-start lg:items-center w-full px-[10px] lg:px-[50px] py-[10px] lg:py-[50px]'>
                <div className='z-[4] w-full flex justify-between lg:justify-center flex-col-reverse lg:flex-row relative lg:gap-[150px] px-[80px]'>
                    <div className='relative h-full w-full'>
                        <Image src={logo} alt="logo de l'entreprise Exotik Digital Studio" width={100} height={80} className='z-[4]' />
                    </div>
                    <div className='min-w-fit'>
                        <div className='z-[4] flex flex-col w-auto'>
                            <h1 className='text-[1.2rem] lg:text-[26px] leading-none lg:pb-[50px] underline'>Navigation</h1>
                            <ul id='footer-navigation' className='text-[1rem] lg:text-[22px]'>

                                <Magnetic>
                                    <li className='footer-link  transition ease hover:text-[#771A66]' >
                                        <TransitionLink href="/contact" label="Contact"/>
                                    </li>
                                </Magnetic>

                                <Magnetic>
                                    <li className='footer-link  transition ease hover:text-[#771A66] w-contain'>
                                        <TransitionLink href="/pricing" label="Nos tarifs" />
                                    </li>
                                </Magnetic>

                                <Magnetic>
                                    <li className='footer-link  transition ease hover:text-[#771A66] text-nowrap min-w-fit'>
                                        <TransitionLink href="/realisations" label="Nos réalisations" />
                                    </li>
                                </Magnetic>

                            </ul>
                        </div>
                    </div>

                    <div className='z-[4] items-start justify-start flex flex-col gap-[5px] w-full'>
                        <h1 className='text-[1.2rem] lg:text-[26px] leading-none lg:mb-[50px] underline'>Contact</h1>

                        <Magnetic>
                            <div>
                                <p className='flex text-[1rem] lg:text-[22px] w-full cursor-pointer'>+ 262 692 58 59 99</p>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <button id='copy-text-btn'
                                className='flex gap-6 leading-none text-[1rem] lg:text-[22px] text-white cursor-pointer transition ease-in-out hover:border-t z-[4] ' onClick={copyText} value="ExotikDigitalStudio@outlook.com" >
                                ExotikDigitalStudio@outlook.com
                            </button>
                        </Magnetic>

                        {isCopied && (
                            <span className='text-[1em] z-[4] tracking-tighter'>L&apos;email à bien été copié !</span>
                        )}
                    </div>
                    <div className=' flex flex-col z-[4] w-full lg:w-auto text-[1rem] lg:text-[22px] gap-[5px] mt-[5px] lg:mt-[0px]'>
                        <h1 className='text-[1.2rem] lg:text-[26px] leading-none lg:mb-[50px] underline'>Liens utiles</h1>
                        <Magnetic>
                            <TransitionLink href="/politique-de-confidentialite">
                                <h2 className='text-nowrap cursor-pointer leading-none'>Politique de confidentialité</h2>
                            </TransitionLink>

                        </Magnetic>
                        <Magnetic>
                            <TransitionLink href="/mentions-legales">
                                <h2 className='text-nowrap cursor-pointer  leading-none'>Mention Légales</h2>
                            </TransitionLink>
                        </Magnetic>
                    </div>
                </div>
                <div className='flex w-full relative lg:absolute bottom-[0px] lg:bottom-[50px] z-[4] justify-center gap-6'>
                    <div className='flex z-[4] w-full justify-center items-center gap-6 '>
                        {/* <p className='z-[4] border-r border-b pr-2 border-white'>Retrouvez nous sur</p> */}
                        <div className='flex gap-6'>
                            <Magnetic>
                                <svg width="30" className='hover:-rotate-12 transition duration-150 ease-in-out' height="30" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M66.2415 0H6.15213C2.86875 0 0 2.3625 0 5.60732V65.8302C0 69.0927 2.86875 72 6.15213 72H66.2238C69.5249 72 71.9999 69.0734 71.9999 65.8302V5.60732C72.0192 2.3625 69.5249 0 66.2415 0ZM22.3184 60.0155H12.0037V27.945H22.3184V60.0155ZM17.5178 23.0689H17.4439C14.1428 23.0689 12.0053 20.6116 12.0053 17.5355C12.0053 14.4032 14.1991 12.0037 17.5741 12.0037C20.9491 12.0037 23.0142 14.3855 23.0882 17.5355C23.0866 20.6116 20.9491 23.0689 17.5178 23.0689ZM60.0154 60.0155H49.7008V42.48C49.7008 38.2789 48.1997 35.4086 44.468 35.4086C41.6169 35.4086 39.9294 37.3371 39.1789 39.2159C38.8976 39.8909 38.8221 40.8102 38.8221 41.7487V60.0155H28.5075V27.945H38.8221V32.408C40.3232 30.2705 42.668 27.1945 48.1242 27.1945C54.8951 27.1945 60.017 31.6575 60.017 41.2795L60.0154 60.0155Z" fill="white" />
                                </svg>
                            </Magnetic>
                            <Magnetic>
                                <svg width="30" className='hover:-rotate-12 transition duration-150 ease-in-out' height="30" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M75 37.594C75 16.8421 58.2 0 37.5 0C16.8 0 0 16.8421 0 37.594C0 55.7895 12.9 70.9398 30 74.4361V48.8722H22.5V37.594H30V28.1955C30 20.9398 35.8875 15.0376 43.125 15.0376H52.5V26.3158H45C42.9375 26.3158 41.25 28.0075 41.25 30.0752V37.594H52.5V48.8722H41.25V75C60.1875 73.1203 75 57.1053 75 37.594Z" fill="white" />
                                </svg>
                            </Magnetic>
                            <Magnetic>
                                <svg width="30" className='hover:-rotate-12 transition duration-150 ease-in-out' height="30" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.75 0H53.25C65.25 0 75 9.75 75 21.75V53.25C75 59.0185 72.7085 64.5507 68.6296 68.6296C64.5507 72.7085 59.0185 75 53.25 75H21.75C9.75 75 0 65.25 0 53.25V21.75C0 15.9815 2.29151 10.4493 6.37043 6.37043C10.4493 2.29151 15.9815 0 21.75 0ZM21 7.5C17.4196 7.5 13.9858 8.92232 11.4541 11.4541C8.92232 13.9858 7.5 17.4196 7.5 21V54C7.5 61.4625 13.5375 67.5 21 67.5H54C57.5804 67.5 61.0142 66.0777 63.5459 63.5459C66.0777 61.0142 67.5 57.5804 67.5 54V21C67.5 13.5375 61.4625 7.5 54 7.5H21ZM57.1875 13.125C58.4307 13.125 59.623 13.6189 60.5021 14.4979C61.3811 15.377 61.875 16.5693 61.875 17.8125C61.875 19.0557 61.3811 20.248 60.5021 21.1271C59.623 22.0061 58.4307 22.5 57.1875 22.5C55.9443 22.5 54.752 22.0061 53.8729 21.1271C52.9939 20.248 52.5 19.0557 52.5 17.8125C52.5 16.5693 52.9939 15.377 53.8729 14.4979C54.752 13.6189 55.9443 13.125 57.1875 13.125ZM37.5 18.75C42.4728 18.75 47.2419 20.7254 50.7583 24.2417C54.2746 27.7581 56.25 32.5272 56.25 37.5C56.25 42.4728 54.2746 47.2419 50.7583 50.7583C47.2419 54.2746 42.4728 56.25 37.5 56.25C32.5272 56.25 27.7581 54.2746 24.2417 50.7583C20.7254 47.2419 18.75 42.4728 18.75 37.5C18.75 32.5272 20.7254 27.7581 24.2417 24.2417C27.7581 20.7254 32.5272 18.75 37.5 18.75ZM37.5 26.25C34.5163 26.25 31.6548 27.4353 29.545 29.545C27.4353 31.6548 26.25 34.5163 26.25 37.5C26.25 40.4837 27.4353 43.3452 29.545 45.455C31.6548 47.5647 34.5163 48.75 37.5 48.75C40.4837 48.75 43.3452 47.5647 45.455 45.455C47.5647 43.3452 48.75 40.4837 48.75 37.5C48.75 34.5163 47.5647 31.6548 45.455 29.545C43.3452 27.4353 40.4837 26.25 37.5 26.25Z" fill="white" />
                                </svg>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
