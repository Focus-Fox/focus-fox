// import React from 'react';
import './KanbanColumn.css';

const KanbanColumn = ({ title, className }) => {
  return (
    <div className={`column ${className}`}>
      <div className="column-header">
        {title}
      </div>
      <div className="task-cards">
        <div className="task-card" />
        <div className="task-card" />
      </div>
    </div>
  );
};

export default KanbanColumn;