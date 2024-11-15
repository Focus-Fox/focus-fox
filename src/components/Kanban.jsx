import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { useTaskStore } from '../store/taskStore';
// import { CheckCircle2, Circle, Timer } from 'lucide-react';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function KanbanBoard({ tasks, moveTask }) {

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    moveTask(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map((column) => (
          <div key={column.id} className="kanban-column">
            <div>
              <h3>{column.title}</h3>
              <span>
                {tasks[column.id]?.length || 0}
              </span>
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
                  {tasks[column.id]?.map((task, index) => (
                    <Draggable key={task} draggableId={task} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          <p>{task}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}