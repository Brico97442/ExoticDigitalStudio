'use client'
import { usePathname,useRouter } from "next/navigation";
import  {animatePageOut} from "./animation";



export default function TransitionLink({label,href}) {
    
  const router = useRouter()
    const pathname = usePathname()

    const handleClick =()=>{
        if(pathname !== href){
            animatePageOut(href, router)
        }
    }
  return (
    <div>
      <button onClick={handleClick}>
        {label}
      </button>
    </div>
  )
}

