import React from "react";

export interface IInputProp {
  field;
  fieldState?;
  mutex?;
  errors?;
  name;
  label?;
  placeholder?;
  required?;
  type?;
  InputProps?;
  disabled?;
}

const Input: React.FC<IInputProp> = ({ field }): JSX.Element => {
  return (
    <input
      type="password"
      placeholder="Password"
      value={field.value}
      onChange={() => {}}
      className="
        form-control
        block
        w-full
        px-1
        py-2
        border-text-elementor-text-1
        font-normal
        text-elementor-text-1
        bg-elementor-1
        bg-clip-padding
        border
        border-solid
        rounded
        transition
        ease-in-out
        m-2
        focus:text-elementor-text-1
        focus:bg-elementor-text-2
        focus:border-elementor-text-1
        focus:outline-none
      "
    />
  );
};

export default Input;
