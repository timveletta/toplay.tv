import React from "react";

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${props.className}`}
  >
    {children}
  </button>
);

export default Button;
