import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface SingleButtonProps 
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SingleButton = forwardRef<HTMLButtonElement, SingleButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(` 
                w-full 
                rounded-full 
                bg-orange-500
                px-2
                py-2
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-white
                hover:opacity-75
                tarnsition
            `, 
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}

        </button>
    )
})



export default SingleButton
