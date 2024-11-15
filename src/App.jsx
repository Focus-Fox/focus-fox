import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import  KanbanBoard  from "./components/Kanban";
import './App.css';
import { processWithGemini } from "./utils/gemini";

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]); // Chat history
  const [kanbanTasks, setKanbanTasks] = useState({ todo: [], inProgress: [], done: [] }); // Kanban tasks
  const [draggedTask, setDraggedTask] = useState(null); // Track the dragged task

  const fetchDataFromGemini = async () => {
    try {
      const tasks = await processWithGemini(prompt);
      setKanbanTasks(prev => ({
        ...prev,
        todo: [...prev.todo, ...tasks]
      }));
      setPrompt("");
    } catch (error) {
      console.error("Error fetching data from Gemini:", error);
      setChatLog([...chatLog, { prompt, response: "Error: Unable to fetch data from Gemini." }]);
    }
  };

  const moveTask = (task, targetColumn) => {
    setKanbanTasks(prev => {
      const sourceColumn = Object.keys(prev).find(column => prev[column].includes(task));
      if (!sourceColumn) return prev;

      const sourceColumnTasks = prev[sourceColumn].filter(t => t !== task);
      const targetColumnTasks = [...prev[targetColumn], task];

      return {
        ...prev,
        [sourceColumn]: sourceColumnTasks,
        [targetColumn]: targetColumnTasks
      };
    });
  };

  return (
    <>
      <header>
        <SignedOut><SignInButton /></SignedOut>
        <SignedIn><UserButton /></SignedIn>
      </header>
      
      <h1>Focus Fox</h1>
      <h2>Kanban Board</h2>
     <KanbanBoard tasks={kanbanTasks} moveTask={moveTask} />


      <form onSubmit={(e) => { e.preventDefault(); fetchDataFromGemini(); }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;