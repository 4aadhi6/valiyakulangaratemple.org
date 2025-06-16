
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters, GenerateContentResult } from "@google/genai"; // Corrected import
import { GEMINI_TEXT_MODEL } from '../constants';

// IMPORTANT: API key MUST be set as an environment variable `process.env.API_KEY`
// This frontend code assumes `process.env.API_KEY` is made available to it,
// typically through a build process or server-side injection.
// Directly embedding API keys in client-side code is a security risk.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found. Please set process.env.API_KEY. Gemini features will be disabled.");
}

export const generateText = async (prompt: string, systemInstruction?: string): Promise<string> => {
  if (!ai) {
    return "Gemini API is not configured. API key missing.";
  }

  try {
    const params: GenerateContentParameters = {
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        // Omitting thinkingConfig to use default (enabled for higher quality)
        // For low latency (e.g. game AI), use: thinkingConfig: { thinkingBudget: 0 }
      }
    };
    if (systemInstruction) {
      if(params.config){
        params.config.systemInstruction = systemInstruction;
      } else {
         params.config = { systemInstruction: systemInstruction };
      }
    }

    const response: GenerateContentResponse = await ai.models.generateContent(params);
    return response.text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    if (error instanceof Error) {
        return `Error from Gemini: ${error.message}`;
    }
    return "An unknown error occurred while contacting Gemini.";
  }
};

export const generateDescriptionForPooja = async (poojaName: string, keywords?: string): Promise<string> => {
  const prompt = `Generate a concise and appealing description for a temple pooja named "${poojaName}". 
  Highlight its significance and benefits for devotees. 
  ${keywords ? `Incorporate the following keywords: ${keywords}.` : ''}
  The description should be suitable for a temple website. Maximum 2-3 sentences.`;
  const systemInstruction = "You are an assistant helping write content for a temple website. Responses should be respectful and informative.";
  return generateText(prompt, systemInstruction);
};

export const generateJsonFromPrompt = async <T,>(prompt: string, systemInstruction?: string): Promise<T | string> => {
  if (!ai) {
    return "Gemini API is not configured. API key missing.";
  }
  try {
    const params: GenerateContentParameters = {
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    };
     if (systemInstruction) {
      if(params.config){
        params.config.systemInstruction = systemInstruction;
      } else {
         params.config = { systemInstruction: systemInstruction };
      }
    }

    const response: GenerateContentResponse = await ai.models.generateContent(params);
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as T;
      return parsedData;
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini:", e, "Raw response:", jsonStr);
      return `Failed to parse JSON: ${ (e as Error).message }. Raw response: ${jsonStr}`;
    }

  } catch (error) {
    console.error("Error generating JSON with Gemini:", error);
     if (error instanceof Error) {
        return `Error from Gemini: ${error.message}`;
    }
    return "An unknown error occurred while contacting Gemini.";
  }
};
