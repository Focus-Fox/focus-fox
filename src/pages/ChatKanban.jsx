import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// components
import Kanban from "../components/Kanban";
import AIChat from "../components/AIChat";
// styles
import './ChatKanban.css';
import model from "../prompt.js"

function ChatKanban() {
    
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
            // Constructs the final prompt which whill be pushed to the kanban board and not seen by the user
            const finalPrompt = pushToKanban
                // Takes last item of chat log and adds instructions to make the response in a codeblock of HTML
                ? `${chatLog[chatLog.length - 1].response}\n\nGenerate a code block of HTML, make each item in this to do list a separate div with a class name of card, put in no styling at all, only include the 'card' divs, do not include any head or body tags or anything like that.`
                : prompt;

            const result = await model.generateContent(finalPrompt);
            const aiResponse = result.response.text();

            if (pushToKanban) {
                console.log("kanban GO!!!")
                const htmlCodeMatch = aiResponse.match(/```([^]+?)```/);
                if (htmlCodeMatch) {
                    const htmlContent = htmlCodeMatch[1];
                    console.log("html content", htmlContent);
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