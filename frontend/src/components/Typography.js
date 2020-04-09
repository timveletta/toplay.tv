import React from "react";

const H2 = ({ children }) => (
  <h2 className={`font-sans text-4xl text-bold text-center text-gray-800 mb-6`}>
    {children}
  </h2>
);

const H4 = ({ children }) => (
  <h2 className={`font-sans text-2xl text-bold text-gray-800 mb-4`}>
    {children}
  </h2>
);

export { H2, H4 };
