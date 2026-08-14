// src/app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Keep system prompt and model config in one well-commented module
const systemPrompt = `You are an expert technical interviewer. Ask technical questions, evaluate answers, and provide concise, professional feedback.`;

export async function POST(req: Request) {
  // Extract the messages array from the request body
  const { messages } = await req.json();

  // Call the Gemini model using the AI SDK's streamText
  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages,
  });

  // Return a streaming response back to the client
  return result.toDataStreamResponse();
}