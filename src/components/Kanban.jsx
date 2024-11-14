import React from 'react';
import KanbanBoard from 'react-custom-kanban-board';
import { Editor } from 'react-notion-wysiwyg';

export default function Kanban () {
    const columns = [
        { title: "To Do", key: "todo", color: "#BDBDCD" },
        { title: "In Progress", key: "in-progress", color: "#FDDDE3" },
        { title: "Done", key: "done", color: "#71C781" },
      ];
    
    const initialCards = [
        {
          id: "1",
          title: "Task 1",
          status: "todo",
          avatarPath: "https://i.pravatar.cc/40?img=1",
        },
        {
          id: "2",
          title: "Task 2",
          status: "in-progress",
          avatarPath: "https://i.pravatar.cc/40?img=2",
        },
      ];
    return (
        <div>
            <Editor />
        <h1>My Kanban Board</h1>
        <KanbanBoard
          columns={columns}
          initialCards={initialCards}
          columnForAddCard="todo"
        />
      </div>
/* <div className="kanban-board">
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
      </div> */
    )
}
