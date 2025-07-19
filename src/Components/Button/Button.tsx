import React from "react";
import styles from "./button.module.scss";
import { ButtonProps } from "@/Types/Types";

const Button = ({ children, type }: ButtonProps) => {
  return (
    <button type={type} className={styles.buttonComponent}>
      {children}
    </button>
  );
};

export default Button;
