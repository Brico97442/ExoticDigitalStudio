import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Bodyscrolllock() {
    
    const bodyStyle = document.body.style
    consst[isLocked, setIsLocked] = useState(
        bodyStyle.overflowY === 'hidden'
    )

    useEffect(() => {
        bodyStyle.overflowY == isLocked? 'hidden' : 'auto'
    }, [ isLocked,bodyStyle])

    return [isLocked]
}
