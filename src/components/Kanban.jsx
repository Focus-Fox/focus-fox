import { useState } from "react";
import './Kanban.css';

// This is the "task burrow"

function Kanban({kanbanTasks, setKanbanTasks}) {
    const [draggedTask, setDraggedTask] = useState(null); // Track the dragged task
    // Drag functionality
    const onDragStart = (task, column) => {
        setDraggedTask({ task, column });
    };
    const onDrop = (targetColumn) => {
        if (draggedTask) {
            setKanbanTasks(prev => {
                const sourceColumn = prev[draggedTask.column].filter(t => t !== draggedTask.task);
                const targetColumnTasks = [...prev[targetColumn], draggedTask.task];
                return {
                    ...prev,
                    [draggedTask.column]: sourceColumn,
                    [targetColumn]: targetColumnTasks
                };
            });
            setDraggedTask(null); // Reset dragged task
        }
    };

    return (
        <div className="kanban-container">
            <h2>Task Burrow</h2>
            <div className="kanban-board">
                {["todo", "doing", "done"].map(column => (
                    <div
                        key={column}
                        className="kanban-column"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDrop(column)}
                    >
                        <h3>{column.replace(/^\w/, (c) => c.toUpperCase())}</h3>
                        <div className="task-list">
                            {kanbanTasks[column].map((task, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    dangerouslySetInnerHTML={{ __html: task }}
                                    draggable
                                    onDragStart={() => onDragStart(task, column)}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Kanban