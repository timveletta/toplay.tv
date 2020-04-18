import React, { FC, ButtonHTMLAttributes } from "react";

interface IButton extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string;
}

const Button: FC<IButton> = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${props.className}`}
  >
    {children}
  </button>
);

export default Button;
