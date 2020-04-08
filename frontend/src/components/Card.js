import React from "react";

const Card = ({ children, ...props }) => (
  <div
    {...props}
    className={`max-w rounded overflow-hidden border border-gray-400 p-4`}
  >
    {children}
  </div>
);

export default Card;
