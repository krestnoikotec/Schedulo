import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AddTaskProps } from "@/Types/Types";
import styles from "./addTaskComponent.module.scss";
import Input from "@/Components/Input/Input";
import Button from "@/Components/Button/Button";

const AddTaskComponent = ({
  handleSubmit,
  setTaskForm,
  taskForm,
}: AddTaskProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (
    value: Date | null,
    field: "dateStart" | "dateEnd",
  ) => {
    setTaskForm((prev) => ({
      ...prev,
      [field]: value ? value.toISOString() : "",
    }));
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <Input
        type={"text"}
        placeholder={"Enter Name..."}
        name={"title"}
        onChange={handleChange}
        value={taskForm.title}
        onKeyDown={handleKeyEnter}
      >
        Task Name:
      </Input>
      <Input
        type={"text"}
        placeholder={"Enter Description..."}
        name={"description"}
        onChange={handleChange}
        value={taskForm.description}
        onKeyDown={handleKeyEnter}
      >
        Task Description:
      </Input>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div>
          <DateTimePicker
            label="Start Date:"
            value={taskForm.dateStart ? new Date(taskForm.dateStart) : null}
            onChange={(newValue) => handleDateChange(newValue, "dateStart")}
            maxDateTime={
              taskForm.dateEnd ? new Date(taskForm.dateEnd) : undefined
            }
            ampm={false}
          />
          <DateTimePicker
            label="End Date:"
            value={taskForm.dateEnd ? new Date(taskForm.dateEnd) : null}
            onChange={(newValue) => handleDateChange(newValue, "dateEnd")}
            minDateTime={
              taskForm.dateStart ? new Date(taskForm.dateStart) : undefined
            }
            ampm={false}
          />
        </div>
      </LocalizationProvider>
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default AddTaskComponent;
