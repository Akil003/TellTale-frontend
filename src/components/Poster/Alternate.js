import React from 'react'

export default function Alternate({ parentClass, message }) {
    return (
        <div className={parentClass}>
            <div className="alternate__container">
                <div>
                    {message}
                </div>
            </div>
        </div>
    )
}
