import { useState } from "react";
import './AIChat.css';
{/* props chatLog fetchDatafromGemini setPrompt */}
function AIChat({chatLog, fetchDataFromGemini, prompt, setPrompt}) {

    return (
        <div className="chat-container">
            <h2>Chat with Finley</h2>
            {/* opaque white bg, rgba colors - a is opacity 0-1 */}
            <div className="chat-log">
                {chatLog.map((entry, index) => (
                    <div key={index}>
                        <p><strong>Prompt:</strong> {entry.prompt}</p>
                        <p><strong>Response:</strong> {entry.response}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); fetchDataFromGemini(); }}>
                {/* change to textarea */}
                <textarea
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows="4"
                    cols="50"
                >Enter your prompt here</textarea>
                <button type="submit">Submit</button>
            </form>
            <button className="to-kanban" onClick={() => fetchDataFromGemini(true)}>Push to Kanban</button>
        </div>
    )
}

export default AIChat