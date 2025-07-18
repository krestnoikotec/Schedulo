import React from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  name: string;
};

const Input = ({
  type,
  placeholder,
  value,
  children,
  onChange,
  onKeyDown,
  name,
}: InputProps) => {
  return (
    <div>
      <label>
        {children}
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  );
};

export default Input;
