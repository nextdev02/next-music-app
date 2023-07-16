import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps 
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SubButton = forwardRef<HTMLButtonElement, ButtonProps>(({
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
                bg-orange-600
                px-3
                py-2
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-white
                font-medium
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



export default SubButton