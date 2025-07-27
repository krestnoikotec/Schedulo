import { View } from "react-big-calendar";
import React from "react";

export type Task = {
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  done: boolean;
  dueDate: string;
  id: string;
  priority: number;
};

export type CalendarEvents = Task & {
  start: Date;
  end: Date;
};

export type CalendarProps = {
  events: Task[];
  setCalendarView: (view: View) => void;
  calendarView: View;
  selected: Date;
  setSelected: (selected: Date) => void;
};

export type DayPickerProps = {
  selected: Date;
  onDayClick: (date: Date) => void;
};

export type FormValues = Omit<Task, "done" | "dueDate" | "id">;

export type AddTaskProps = {
  onSubmit: (data: FormValues) => void;
};

export type InputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  name: string;
  children?: React.ReactNode;
};

export type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
};

export type TaskPriorityProps = {
  value: number;
  onChange: (value: number) => void;
};
