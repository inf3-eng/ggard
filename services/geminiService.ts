
import { GoogleGenAI, Type } from "@google/genai";
import type { PlantAnalysis, ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

export async function analyzePlantImage(base64Image: string, mimeType: string): Promise<PlantAnalysis> {
    const imagePart = fileToGenerativePart(base64Image, mimeType);

    const prompt = `You are a world-class botanist and gardening expert. Analyze the provided image of a plant. Based on the image, provide the following information in a structured JSON format:
1.  Identify the plant's common name.
2.  Provide detailed care instructions covering watering, sunlight, and soil requirements.
3.  Assess the plant's current condition as seen in the photo. Look for signs of health or distress (e.g., yellowing leaves, pests, wilting).
4.  Suggest a few actionable next steps to improve or maintain the plant's health.
5.  Estimate the typical market price for a plant of this type and size in Dubai, UAE, in AED.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    plantName: { type: Type.STRING },
                    careInstructions: {
                        type: Type.OBJECT,
                        properties: {
                            watering: { type: Type.STRING },
                            sunlight: { type: Type.STRING },
                            soil: { type: Type.STRING }
                        },
                        required: ["watering", "sunlight", "soil"]
                    },
                    currentCondition: { type: Type.STRING },
                    nextSteps: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    estimatedPriceAED: { type: Type.STRING }
                },
                required: ["plantName", "careInstructions", "currentCondition", "nextSteps", "estimatedPriceAED"]
            },
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
}

export async function getChatResponse(history: ChatMessage[], newMessage: string): Promise<string> {
    const model = 'gemini-2.5-flash';
    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction: "You are a friendly and knowledgeable gardening assistant. Answer the user's questions about gardening, plants, and related topics.",
        },
    });

    return response.text;
}
