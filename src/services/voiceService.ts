import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_VISION_API_KEY || import.meta.env.VITE_GROQ_CHATBOT_API_KEY; // Fallback or preferring one? User said "VITE_GOOGLE_GEMINI_VISION_API_KEY"

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Simplifies complex scheme text into simple Hindi/English for farmers.
 */
export const simplifyTextForFarmer = async (text: string, language: "Hindi" | "English" = "Hindi"): Promise<string> => {
    if (!GEMINI_API_KEY) return "AI Service Unavailable. displaying original text.";

    try {
        const prompt = `You are an expert agriculture advisor. Explain the following government scheme details to a farmer in simple ${language}. Keep it short (2-3 sentences max) and easy to understand. Do not invent facts. \n\nDetails: ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Simplification Error:", error);
        return "Could not simplify text. Please read the details above.";
    }
};

/**
 * Speaks the text using Web Speech API.
 */
export const speakText = (text: string, lang: string = "hi-IN") => {
    if (!window.speechSynthesis) {
        alert("Voice not supported on this browser.");
        return;
    }

    // Stop previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
};
