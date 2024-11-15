import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState(""); // users entry
  const [chatLog, setChatLog] = useState([]); // Chat history
  const [kanbanTasks, setKanbanTasks] = useState({ todo: [], doing: [], done: [] }); // Kanban tasks
  const [draggedTask, setDraggedTask] = useState(null); // Track the dragged task
  const { isSignedIn } = useUser(); // useUser provides isSignedIn and user information
  const isUserLoggedIn = isSignedIn ?? false;

    // oh its not calling the function! 
    // Helper function to split the cards
    const splitCards = (htmlString) => {
      // Regex to match each <div class="card">...</div> as a separate item
      return htmlString.match(/<div class="card">.*?<\/div>/g) || [];
    };

  const fetchDataFromGemini = async (pushToKanban = false) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      /// if you get a 503 error, try itterating through these models
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      // const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      // Constructs the final prompt which whill be pushed to the kanban board and not seen by the user
      const finalPrompt = pushToKanban
        // Takes last item of chat log and adds instructions to make the response in a codeblock of HTML
        ? `${chatLog[chatLog.length - 1].response}\n\nGenerate a code block of HTML, make each item in this to do list a separate div with a class name of card, put in no styling at all`
        : prompt;
      
      const result = await model.generateContent(finalPrompt);
      const aiResponse = result.response.text();

      if (pushToKanban) {
        const htmlCodeMatch = aiResponse.match(/```([^]+?)```/);
        if (htmlCodeMatch) {
          const htmlContent = htmlCodeMatch[1];
          const separatedCards = splitCards(htmlContent); // Separate the cards
          console.log("Separated cards:", separatedCards);
          // this is the lump we want to unlump
          setKanbanTasks(prev => ({
            ...prev,
            todo: [...prev.todo, ...separatedCards]
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
    <>
    <div className="container">
      {isUserLoggedIn ? (
        <div>
          <header className="head-bar">
            <SignedOut><SignInButton /></SignedOut>
            <SignedIn><UserButton /></SignedIn>
          </header>

          <h1 className="title">Focus Fox</h1>
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
      ) : (
        // Login Page
        <header>
          <SignedOut><SignInButton /></SignedOut>
          <SignedIn><UserButton /></SignedIn>
        </header>
      )}
</div>
    </>
  );
}

export default App;