import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]); // Chat history
  const [kanbanTasks, setKanbanTasks] = useState({ todo: [], doing: [], done: [] }); // Kanban tasks
  const [draggedTask, setDraggedTask] = useState(null); // Track the dragged task
  /// clerk stuff
  const { isSignedIn } = useUser(); // useUser provides isSignedIn and user information
  // `isUserLoggedIn` is true if user is signed in, false if not
  const isUserLoggedIn = isSignedIn ?? false;

  const fetchDataFromGemini = async (pushToKanban = false) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      /// if you get a 503 error, try itterating through these models
      /// could also do an if else for this if they aren't working
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      // const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const finalPrompt = pushToKanban
        ? `${chatLog[chatLog.length - 1].response}\n\nGenerate a code block of HTML, make each item in this to do list a separate div with a class name of card, put in no styling at all`
        : prompt;

      const result = await model.generateContent(finalPrompt);
      const aiResponse = result.response.text();

      if (pushToKanban) {
        const htmlCodeMatch = aiResponse.match(/```([^]+?)```/);
        if (htmlCodeMatch) {
          const htmlContent = htmlCodeMatch[1];
          // this is the lump we want to unlump
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
      {isUserLoggedIn ? (
        <div>
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
                // this is the draggability stuff that 
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

          <h2>AI Chat</h2>
          <div className="chat-log">
            {chatLog.map((entry, index) => (
              <div key={index}>
                <p><strong>Prompt:</strong> {entry.prompt}</p>
                <p><strong>Response:</strong> {entry.response}</p>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); fetchDataFromGemini(); }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt("respond only in html" + e.target.value)}
              placeholder="Enter your prompt here"
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => fetchDataFromGemini(true)}>Push to Kanban</button>

        </div>
      ) : (
        <header>
          <SignedOut><SignInButton /></SignedOut>
          <SignedIn><UserButton /></SignedIn>
        </header>
      )}

    </>
  );
}

export default App;