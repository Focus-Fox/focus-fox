// import React from 'react';
import NavBar from './components/NavBar';
import ScheduleBox from './components/ScheduleBox';
import ChatBot from './components/ChatBot';
import KanbanColumn from './components/KanbanColumn';
import FoxTip from './components/FoxTip';
import './KanbanPage.css';

const Kanban = () => {
  return (
    <div className="task-manager">
      <NavBar />
      
      <main className="main-content">
      <ScheduleBox />
      <ChatBot />
        <KanbanColumn 
          title="To-Do" 
          className="todo-column"
        />
        
        <KanbanColumn 
          title="In-Progress" 
          className="progress-column"
        />
        
        <KanbanColumn 
          title="Done" 
          className="done-column"
        />
      </main>

      <FoxTip />
    </div>
  );
};

export default Kanban;