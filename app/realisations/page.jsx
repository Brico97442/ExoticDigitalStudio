'use client';

import GridAnimation from "../components/GridAnimation";


export default function Works() {

    return (
        <div className="h-full w-full flex flex-col z-[2] relative text-6xl">
           <h1 className="tracking-tighter text-[180px] px-[64px] leadind-none mt-40">Réalisations</h1>
           <div id="works_container" className=" w-full h-full px-[80px] z-[2]">
            <GridAnimation/>
           </div>
        </div>
    );
}

