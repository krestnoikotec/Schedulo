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

export type AddTaskProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  taskForm: Omit<Task, "done" | "dueDate" | "id">;
  setTaskForm: React.Dispatch<
    React.SetStateAction<Omit<Task, "done" | "dueDate" | "id">>
  >;
};

export type InputProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (
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
