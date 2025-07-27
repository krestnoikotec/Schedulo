import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DayPickerProps } from "@/Types/Types";
import styles from "./dayPickerComponent.module.scss";

const DayPickerComponent = ({ selected, onDayClick }: DayPickerProps) => {
  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onDayClick={(date: Date) => onDayClick(date)}
      required={false}
      classNames={{
        day: styles.myDay,
        day_selected: styles.mySelectedDay,
        caption_label: styles.myCaption,
        nav_button: styles.myNavBtn,
        table: styles.myTable,
        months: styles.myMonths,
      }}
    />
  );
};

export default DayPickerComponent;
