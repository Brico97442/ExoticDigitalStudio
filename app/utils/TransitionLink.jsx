'use client'
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
    
    return (
        <div>
            <li id="navigation-link" className="flex justify-center items-center cursor-pointer" onClick={handleClick}>
                {children || label}
            </li>
        </div>
    )
}