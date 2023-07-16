import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        `
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
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

SingleButton.displayName = "SingleButton";

export default SingleButton