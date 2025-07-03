import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const fullPrompt = `${prompt}\nResponda de forma objetiva e utilize markdown para listas, destaques e exemplos.`;
  const result = await model.generateContent(fullPrompt);
  return result.response.text();
}
