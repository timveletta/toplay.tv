import React, { FC, ButtonHTMLAttributes } from "react";

interface IButton extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  disabled?: boolean;
  className?: string;
  color: "primary" | "accent";
}

const Button: FC<IButton> = ({ children, disabled, color, ...props }) => (
  <button
    {...props}
    className={` text-white font-bold py-2 px-4 rounded 
      ${props.className} 
      ${
        color === "primary"
          ? "bg-blue-500 hover:bg-blue-700"
          : "bg-red-500 hover:bg-red-700"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

export default Button;
