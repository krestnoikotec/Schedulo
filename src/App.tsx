import React, { useState, useEffect } from "react";
import "./App.css";
import TaskElement from "./Components/Task/TaskElement";
import Input from "./Components/Input/Input";
import { Task } from "./Types/Types";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DayPicker } from "react-day-picker";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  const localizer = momentLocalizer(moment);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskForm, setTaskForm] = useState<
    Omit<Task, "done" | "dueDate" | "id">
  >({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
  });
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Date>();

  useEffect(() => {}, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newTask: Task = {
      ...taskForm,
      id: id,
      done: false,
      dueDate: "",
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskForm({
      title: "",
      description: "",
      dateStart: "",
      dateEnd: "",
    });
  };

  const toggleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done, dueDate: new Date().toISOString() }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const parseDate = (date: string) => {
    const [day, month, year] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Task Name"}
          name={"title"}
          onChange={handleChange}
          value={taskForm.title}
          onKeyDown={handleKeyEnter}
        >
          Task Name:
        </Input>
        <Input
          type={"text"}
          placeholder={"Task Description"}
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
            />
            <DateTimePicker
              label="End Date:"
              value={taskForm.dateEnd ? new Date(taskForm.dateEnd) : null}
              onChange={(newValue) => handleDateChange(newValue, "dateEnd")}
              minDateTime={
                taskForm.dateStart ? new Date(taskForm.dateStart) : undefined
              }
            />
          </div>
        </LocalizationProvider>
        <button type="submit">Add Task</button>
      </form>
      <DayPicker
        animate
        mode={"single"}
        selected={selected}
        onSelect={setSelected}
        footer={selected ? `Select ${selected.toISOString()}` : "Pick a day"}
      />
      {[...tasks]
        .sort(
          (a, b) =>
            parseDate(a.dateStart).getTime() - parseDate(b.dateStart).getTime(),
        )
        .map((task: Task, index: number) => (
          <TaskElement
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleCompleteTask}
          ></TaskElement>
        ))}

      <Calendar
        localizer={localizer}
        events={tasks.map((task) => ({
          ...task,
          start: new Date(task.dateStart),
          end: new Date(task.dateEnd),
          title: task.title,
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default App;
