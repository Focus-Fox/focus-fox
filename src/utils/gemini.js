import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function processWithGemini(input) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Convert the following stream of consciousness into a clear, actionable task list.
      Each task should be specific and achievable.
      Return only the tasks as a numbered list, with each task being concise and clear.
      
      Input: ${input}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the response into individual tasks and clean them up
    return text
      .split('\n') // Split by new lines
      .filter(line => line.trim()) // Remove empty lines
      .map(line => line.replace(/^\d+\.\s*/, '').trim()) // Remove numbering and extra spaces
      .filter(task => task.length > 0) // Remove empty tasks
  } catch (error) {
    console.error('Error processing with Gemini:', error);
    throw error;
  }
}