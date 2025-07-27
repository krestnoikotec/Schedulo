import React from "react";
import styles from "./taskPriority.module.scss";
import { TaskPriorityProps } from "@/Types/Types";

const TaskPriority = ({ value, onChange }: TaskPriorityProps) => {
  const options = ["High", "Medium", "Low"];

  return (
    <div className={styles.radioGroup}>
      {options.map((label, index) => (
        <label
          key={label}
          className={`${styles.radioOption} ${styles[label.toLowerCase()]}`}
        >
          <input
            type="radio"
            name="priority"
            className={styles.radioInput}
            checked={value === index}
            onChange={() => onChange(index)}
          />
          <div className={styles.radioCircle} />
          <span className={styles.radioLabel}>{label}</span>
        </label>
      ))}
    </div>
  );
};

export default TaskPriority;
