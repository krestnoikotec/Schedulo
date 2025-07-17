import { Task } from "../../Types/Types"

type TaskProps = {
    task: Task;
    deleteTask: (title: string) => void;
    toggleComplete: (title: string) => void;
}

const TaskElement = ({task, deleteTask, toggleComplete}: TaskProps) => {
    return (
        <div>
            <h2 style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {task.title}
            </h2>
            <p>
                Task must be completed from {task.dateStart} to {task.dateEnd}
            </p>
            <div>
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleComplete(task.id)}
                />
                {task.done && (
                    <p>Task has been completed at {task.dueDate}</p>
                )}</div>
            <div>
                <p>{task.description}</p>
            </div>
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
        </div>
    );
};

export default TaskElement;