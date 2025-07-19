import React from "react";
import { DayPicker } from "react-day-picker";
import { DayPickerProps } from "@/Types/Types";

const DayPickerComponent = ({ selected, onDayClick }: DayPickerProps) => {
  return (
    <>
      <DayPicker
        animate
        mode="single"
        selected={selected}
        onDayClick={(date: Date) => onDayClick(date)}
        footer={selected ? `Select ${selected.toISOString()}` : "Pick a day"}
        required={false}
      />
    </>
  );
};

export default DayPickerComponent;
