import React, { FC } from "react";

interface IAlert {
  className?: string;
}

const Alert: { Error: FC<IAlert>; Warning: FC<IAlert>; Success: FC<IAlert> } = {
  Error: ({ children, ...props }) => (
    <div
      className={`bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 ${props.className}`}
      role="alert"
    >
      {children}
    </div>
  ),
  Warning: ({ children, ...props }) => (
    <div
      className={`bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 ${props.className}`}
      role="alert"
    >
      {children}
    </div>
  ),
  Success: ({ children, ...props }) => (
    <div
      className={`bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 ${props.className}`}
      role="alert"
    >
      {children}
    </div>
  ),
};

export default Alert;
