import React from "react";

const Input = ({ register, ...props }) => (
  <input
    ref={register(props.validation || {})}
    {...props}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3`}
  />
);

export default Input;
