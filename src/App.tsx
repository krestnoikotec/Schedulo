import React, { useState } from "react";
import "./App.css";
import TaskElement from "./Components/Task/TaskElement";
import { Task } from "./Types/Types";
import { View } from "react-big-calendar";
import CalendarComponent from "@/Components/CalendarComponent/CalendarComponent";
import DayPickerComponent from "@/Components/DayPickerComponent/DayPickerComponent";
import AddTaskComponent from "@/Components/AddTaskComponent/AddTaskComponent";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<View>("month");
  const [taskForm, setTaskForm] = useState<
    Omit<Task, "done" | "dueDate" | "id">
  >({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
  });

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

  const handleDate = (date: Date) => {
    setSelected(date);
    setCalendarView("day");
  };

  return (
    <div>
      <AddTaskComponent
        handleSubmit={handleSubmit}
        taskForm={taskForm}
        setTaskForm={setTaskForm}
      />
      <DayPickerComponent selected={selected} onDayClick={handleDate} />
      {[...tasks]
        .sort(
          (a, b) =>
            parseDate(a.dateStart).getTime() - parseDate(b.dateStart).getTime(),
        )
        .map((task: Task) => (
          <TaskElement
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleCompleteTask}
          ></TaskElement>
        ))}

      <CalendarComponent
        events={tasks}
        setCalendarView={setCalendarView}
        calendarView={calendarView}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

export default App;
