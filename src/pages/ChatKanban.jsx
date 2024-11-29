import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// components
import Kanban from "../components/Kanban";
import AIChat from "../components/AIChat";
// styles
import './ChatKanban.css';

function ChatKanban() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const [prompt, setPrompt] = useState(""); // users entry
    const [chatLog, setChatLog] = useState([]); // Chat history
    const [kanbanTasks, setKanbanTasks] = useState({ todo: [], doing: [], done: [] }); // Kanban tasks
    const [showKanban, setShowKanban] = useState(false);

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
            // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
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
                    // displays kanban board
                    setShowKanban(true);
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


    return (
        <div className="chat-kanban-container">
            { showKanban === true ? (
                <Kanban kanbanTasks={kanbanTasks} setKanbanTasks={setKanbanTasks} />
            ) : (
                <AIChat chatLog={chatLog} prompt={prompt} fetchDataFromGemini={fetchDataFromGemini} setPrompt={setPrompt} />
            ) }
        </div>
    )
}

export default ChatKanban