import React, { useState } from 'react'

function Aside() {
    const [isOpen, setIsOpen] = useState(false)

    openAside = () => {
        setIsOpen(true)
    }
    closeAside = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <aside>

            </aside>

        </div>
    )
}

export default Aside