import {useState} from 'react'
import './App.css'
import TaskElement from "./Components/Task/TaskElement"
import Input from "./Components/Input/Input"
import { Task } from "./Types/Types"

function App() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskForm, setTaskForm] = useState<Omit<Task, 'done' | 'dueDate' | 'id'>>({
      title: '',
      description: '',
      dateStart: '',
      dateEnd: ''
    })
    const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setTaskForm(prev => ({ ...prev, [name]: value }) )
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = crypto.randomUUID();
        const newTask: Task = {
            ...taskForm,
            id: id,
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

    const toggleCompleteTask = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, done: !task.done, dueDate: new Date().toISOString()} : task
            )
        )
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const parseDate = (date: string) => {
        const [day, month, year] = date.split('-').map(Number);
        return new Date(year, month-1, day);
    };

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
            {[...tasks]
            .sort((a, b) => parseDate(a.dateStart).getTime() - parseDate(b.dateStart).getTime())
            .map((task: Task, index: number) => (
                <TaskElement
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleComplete={toggleCompleteTask}
                >
                </TaskElement>
            ))}
        </div>
    )}

export default App
