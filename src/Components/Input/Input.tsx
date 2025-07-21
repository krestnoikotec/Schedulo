import React from "react";
import { InputProps } from "@/Types/Types";
import styles from "./input.module.scss";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  name,
  children,
  ...rest
}: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.inputLabel}>
        {children}
      </label>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={styles.input}
        {...rest}
      />
    </div>
  );
};

export default Input;
