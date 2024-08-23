'use client'
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "./animation";

export default function TransitionLink({ label, href, children,onClick }) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (e) => {
        e.preventDefault();
        if(onClick) {
          onClick();
      }

        if (pathname !== href) {
            animatePageOut(href, router)
        }
    }
    
    return (
        <div>
            <button className="flex justify-center items-center" onClick={handleClick}>
                {children || label}
            </button>
        </div>
    )
}