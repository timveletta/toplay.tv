import React, { FC, InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";

interface IInput extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  register: ReturnType<typeof useForm>["register"];
  validation: any;
}

const Input: FC<IInput> = ({ register, ...props }) => (
  <input
    ref={register(props.validation || {}) as any}
    {...props}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3`}
  />
);

export default Input;
