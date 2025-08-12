'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "./animation";

export default function TransitionLink({ label, href, children, onClick }) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (e) => {
        if(onClick) {
          onClick();
      }

        if (pathname !== href) {
            animatePageOut(href, router)
        }
    }
    
    // Prefetch de la route pour accélérer le rendu au switch
    useEffect(() => {
        if (!href) return;
        try {
            router.prefetch?.(href);
        } catch {}
    }, [href, router]);
    
    return (
        <div>
            <div id="navigation-link" className=" cursor-pointer " onClick={handleClick}>
                {children || label}
            </div>
        </div>
    )
}