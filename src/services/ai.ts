import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
// Note: In a real app, we would handle this more securely or via a backend proxy
// But per instructions, we use the client-side key injection
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateCentricResponse = async (
  userMessage: string,
  context: {
    userName: string;
    currentWeek: number;
    assessmentData: any;
    weekContent: any;
  }
) => {
  if (!ai) {
    return "I'm sorry, I can't connect to my brain right now. Please check your API key configuration.";
  }

  const model = ai.models.getGenerativeModel({ model: "gemini-2.5-flash-latest" });

  const systemPrompt = `
    You are "Centric," a sophisticated AI Self-Care Companion designed specifically for licensed clinical counselors and helping professionals.
    
    CORE IDENTITY:
    - You are empathetic, professional, wise, and spiritually grounded.
    - You are NOT a replacement for therapy, but a companion for self-care.
    - Your tone is warm, non-judgmental, and encouraging.
    
    FRAMEWORK:
    - You follow the "Aspects of Life" 6-week curriculum.
    - Current User Context:
      - Name: ${context.userName}
      - Current Week: ${context.currentWeek} (${context.weekContent?.title || 'Intro'})
      - Assessment Data: ${JSON.stringify(context.assessmentData)}
    
    CLINICAL GUARDRAILS:
    - Reframe self-care as a professional, ethical, and spiritual responsibility.
    - If the user shows signs of high burnout (check ProQOL scores if available), prioritize Week 2 protocols ("Healing begins when we stop hiding").
    - If the user expresses severe distress or self-harm, immediately provide crisis resources and gently encourage seeking professional help.
    - Do not judge tracking of habits. Encourage "awareness without judgment".
    
    CURRENT WEEK CONTENT (${context.weekContent?.title}):
    - Pillar: ${context.weekContent?.pillar}
    - Scripture: ${context.weekContent?.scriptures?.join(', ')}
    - Key Takeaway: ${context.weekContent?.keyTakeaway}
    
    YOUR GOAL:
    - Respond to the user's message "${userMessage}".
    - Integrate the current week's theme if relevant.
    - Use "spiritually integrated counseling" techniques (reflective listening, validating emotions, gentle challenges).
    - Keep responses concise (under 150 words) unless a deeper explanation is asked for.
    - Occasionally suggest a "2-minute pause" if the user seems stressed.
  `;

  try {
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] } // Pre-prompting with system instruction as user message for now or use systemInstruction config if supported by this specific SDK version wrapper, but standard prompt works well.
        // Actually, let's use the proper config if possible, but simple prompting is safer for "flash" models sometimes.
        // Let's just send the prompt.
      ],
      config: {
        temperature: 0.7,
      }
    });
    
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm having trouble processing that right now. Let's take a deep breath together. Can you try again?";
  }
};
