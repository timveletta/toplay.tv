import React, { FC } from "react";

const Card: FC = ({ children, ...props }) => (
  <div {...props} className={`max-w rounded border border-gray-400 p-4`}>
    {children}
  </div>
);

export default Card;
