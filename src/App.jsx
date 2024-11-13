import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]); // Array to store prompt-response pairs

  const fetchDataFromGemini = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content based on user's prompt
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Add the new prompt-response pair to history
      setHistory([...history, { prompt, response: responseText }]);
      setPrompt(""); // Clear input field after submission
    } catch (error) {
      console.error("Error fetching data from Gemini:", error);
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

      {/* Display prompts and corresponding AI responses */}
      <div>
        {history.map((entry, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <strong>You:</strong> <p>{entry.prompt}</p>
            <strong>AI:</strong> <p>{entry.response}</p>
          </div>
        ))}
      </div>

      {/* Form to submit user prompt */}
      <form onSubmit={fetchDataFromGemini}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;