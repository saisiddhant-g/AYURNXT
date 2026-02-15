
import { GoogleGenAI, Type } from "@google/genai";
import { ConditionType, Severity } from "../types";

export const getAyurvedaAdvice = async (condition: ConditionType, severity: Severity): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 concise, professional Ayurvedic healing tips for a patient using a therapeutic bandage for ${condition} with ${severity} severity. Format the output as a simple list of advice strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");
    return result.length > 0 ? result : ["Follow standard Ayurvedic wound care protocols."];
  } catch (error) {
    console.error("Gemini Error:", error);
    return ["Maintain hygiene and warmth around the treated area."];
  }
};
