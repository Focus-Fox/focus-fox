import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import  Kanban from "./components/Kanban";
import './App.css';
import { processWithGemini } from "./utils/gemini";

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]); // Chat history
  const [kanbanTasks, setKanbanTasks] = useState({ todo: [], doing: [], done: [] }); // Kanban tasks
  const [draggedTask, setDraggedTask] = useState(null); // Track the dragged task

  const fetchDataFromGemini = async (pushToKanban = false) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const finalPrompt = pushToKanban
        ? `${chatLog[chatLog.length - 1].response}\n\nGenerate a code block of HTML, make each item in this to do list a separate div with a class name of card, put in no styling at all`
        : prompt;

      const result = await model.generateContent(finalPrompt);
      const aiResponse = result.response.text();

      if (pushToKanban) {
        const htmlCodeMatch = aiResponse.match(/```([^]+?)```/);
        if (htmlCodeMatch) {
          const htmlContent = htmlCodeMatch[1];
          setKanbanTasks(prev => ({
            ...prev,
            todo: [...prev.todo, htmlContent]
          }));
        } else {
          setChatLog([...chatLog, { prompt: finalPrompt, response: "Error: Failed to generate Kanban items. Please try again." }]);
        }
      } else {
        setChatLog([...chatLog, { prompt, response: aiResponse }]);
      }
      setPrompt("");
    } catch (error) {
      console.error("Error fetching data from Gemini:", error);
      setChatLog([...chatLog, { prompt, response: "Error: Unable to fetch data from Gemini." }]);
    }
  };

  // Drag functions
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
    <>
      <header>
        <SignedOut><SignInButton /></SignedOut>
        <SignedIn><UserButton /></SignedIn>
      </header>
      
      <h1>Focus Fox</h1>
      <h2>Kanban Board</h2>
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



      {/* <h2>AI Chat</h2>
      <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div key={index}>
            <p><strong>Prompt:</strong> {entry.prompt}</p>
            <p><strong>Response:</strong> {entry.response}</p>
          </div>
        ))}
      </div> */}
      <form onSubmit={(e) => { e.preventDefault()}}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <button onClick={() => processWithGemini(prompt)} type="submit">Submit</button>
      </form>
      {/* <button onClick={() => fetchDataFromGemini(prompt)}>Push to Kanban</button> */}
    </>
  );
}

export default App;