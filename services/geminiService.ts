import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (): Promise<void> => {
  try {
    const ai = getAiClient();
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the Virtual Creative Director of "Dzyen Studio". 
        Your tone is professional, minimalist, avant-garde, and helpful. 
        You help potential clients understand our services (Branding, Digital Product Design, Creative Development).
        Keep answers concise and stylish, matching the studio's brutalist/minimalist aesthetic.
        If asked about the portfolio, mention our focus on high-end digital experiences.`
      }
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "I'm currently offline. Please try again later.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I processed that, but have no words.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Connection interrupted. Please try again.";
  }
};