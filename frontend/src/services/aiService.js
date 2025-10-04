// src/services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// choose a fast model for quiz generation
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    // try to extract JSON block if extra text exists
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first >= 0 && last > first) {
      const sub = text.slice(first, last + 1);
      return JSON.parse(sub);
    }
    throw err;
  }
}

// Helper to send prompt to Gemini
async function postAI(payload) {
  const prompt = JSON.stringify(payload);

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}

// Generate 5 MCQ questions for a topic
export async function generateQuestionsForTopic(topic, maxRetries = 2) {
  const prompt = {
    task: "generate_mcq_quiz",
    topic,
    count: 5,
    format: "json",
    schema: {
      topic: "string",
      questions: [
        {
          id: "string",
          question: "string",
          options: ["string"],
          correctOptionIndex: "number",
          explanation: "string (optional)",
        },
      ],
    },
    instruction:
      "Return ONLY valid JSON matching the schema. No extra commentary or markdown. Option indices are 0-based.",
  };

  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await postAI({ prompt });
      const parsed = await safeJsonParse(raw);

      if (!parsed.questions || parsed.questions.length !== 5) {
        throw new Error("Parsed JSON missing 5 questions");
      }
      parsed.questions.forEach((q, i) => {
        if (
          !q.question ||
          !Array.isArray(q.options) ||
          typeof q.correctOptionIndex !== "number"
        ) {
          throw new Error(`Invalid question at index ${i}`);
        }
      });
      return parsed;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
    }
  }
  throw lastErr;
}

// Generate AI feedback after quiz
export async function generateFeedback(scorePercent, topic, maxRetries = 1) {
  const prompt = {
    task: "feedback_message",
    topic,
    scorePercent,
    format: "json",
    schema: {
      score: "number",
      message: "string",
    },
    instruction:
      "Return ONLY valid JSON with score (number) and an encouraging custom message as `message`. Keep it concise (1-3 sentences). No extra text.",
  };

  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await postAI({ prompt });
      const parsed = await safeJsonParse(raw);

      if (
        typeof parsed.score !== "number" ||
        typeof parsed.message !== "string"
      ) {
        throw new Error("Invalid feedback response");
      }
      return parsed;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 400));
        continue;
      }
    }
  }
  throw lastErr;
}
