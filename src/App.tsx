import { useState } from 'react'
import './App.css'
import TaskElement from "./Components/Task/TaskElement"
import Input from "./Components/Input/Input"
import { Task } from "./Types/Types"

function App() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskForm, setTaskForm] = useState<Omit<Task, 'done' | 'dueDate'>>({
      title: '',
      description: '',
      dateStart: '',
      dateEnd: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setTaskForm(prev => ({ ...prev, [name]: value }) )
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            ...taskForm,
            done: false,
            dueDate: '',
        };
        setTasks(prev => [ ...prev, newTask]);
        setTaskForm({
            title: '',
            description: '',
            dateStart: '',
            dateEnd: ''
        });
    }

    const toggleCompleteTask = (title: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.title === title ? {...task, done: !task.done, dueDate: new Date().toISOString()} : task
            )
        )
    }

    const deleteTask = (title: string) => {
        setTasks(tasks.filter((task) => task.title !== title))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input type={"text"} placeholder={"Task Name"} name={"title"} onChange={handleChange} value={taskForm.title}>
                    Task Name:
                </Input>
                <Input type={"text"} placeholder={"Task Description"} name={"description"} onChange={handleChange} value={taskForm.description}>
                    Task Description:
                </Input>
                <Input type={"date"} name={"dateStart"} onChange={handleChange} value={taskForm.dateStart} max={taskForm.dateEnd}>
                    Start Date:
                </Input>
                <Input type={"date"} name={"dateEnd"} onChange={handleChange} value={taskForm.dateEnd} min={taskForm.dateStart}>
                    End Date:
                </Input>
                <button type="submit">
                    Add Task
                </button>
            </form>
            {tasks.map((task: Task, index: number) => (
                <TaskElement
                    key={index}
                    task={task}
                    deleteTask={deleteTask}
                    toggleComplete={toggleCompleteTask}
                >
                </TaskElement>
            ))}
        </div>
    )}

export default App
