import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]); // Chat history
  const [kanbanTasks, setKanbanTasks] = useState({ todo: [], doing: [], done: [] }); // Kanban tasks

  const fetchDataFromGemini = async (pushToKanban = false) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Set up the instruction based on whether it's a normal prompt or Kanban-specific
      const finalPrompt = pushToKanban
        ? `${chatLog[chatLog.length - 1].response}\n\nGenerate a codebock of html, make each item in this to do list a separate div with a class name of card, put in no styling at all`
        : prompt;

      const result = await model.generateContent(finalPrompt);
      const aiResponse = result.response.text();

      if (pushToKanban) {
        // Look for the code block and parse it for Kanban cards
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
        // Normal response; add to chat log
        setChatLog([...chatLog, { prompt, response: aiResponse }]);
      }
      setPrompt(""); // Clear the input
    } catch (error) {
      console.error("Error fetching data from Gemini:", error);
      setChatLog([...chatLog, { prompt, response: "Error: Unable to fetch data from Gemini." }]);
    }
  };

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      
      <h1>Focus Fox</h1>
      <h2>Kanban Board</h2>
      <div className="kanban-board">
        <div className="kanban-column">
          <h3>To Do</h3>
          <div className="task-list">
            {kanbanTasks.todo.map((task, index) => (
              <div key={index} className="card" dangerouslySetInnerHTML={{ __html: task }}></div>
            ))}
          </div>
        </div>
        <div className="kanban-column">
          <h3>Doing</h3>
          <div className="task-list">
            {kanbanTasks.doing.map((task, index) => (
              <div key={index} className="card">{task}</div>
            ))}
          </div>
        </div>
        <div className="kanban-column">
          <h3>Done</h3>
          <div className="task-list">
            {kanbanTasks.done.map((task, index) => (
              <div key={index} className="card">{task}</div>
            ))}
          </div>
        </div>
      </div>
      <div>
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
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => fetchDataFromGemini(true)}>Push to Kanban</button>
      </div>
      

    </>
  );
}

export default App;