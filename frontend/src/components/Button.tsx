import React, { FC, ButtonHTMLAttributes } from "react";

interface IButton extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  disabled?: boolean;
  className?: string;
}

const Button: FC<IButton> = ({ children, disabled, ...props }) => (
  <button
    {...props}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
      props.className
    } ${disabled && "opacity-50 cursor-not-allowed"}`}
  >
    {children}
  </button>
);

export default Button;
