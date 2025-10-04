// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

// Helper to sanitize AI output for quiz
function sanitizeQuiz(rawText) {
  let text = rawText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(text);

  parsed.questions = parsed.questions.map((q) => {
    const letter = q.answer.trim().toUpperCase();
    const idx = letter.charCodeAt(0) - 65; // A->0
    return {
      ...q,
      correctOptionIndex: idx,
      answer: undefined,
    };
  });

  return parsed;
}

// --------------------
// Generate Quiz Endpoint
// --------------------
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate exactly 5 MCQs on "${topic}".
Return JSON only in this format:
{
  "questions": [
    {
      "question": "string",
      "options": ["A","B","C","D"],
      "answer": "string (A-D)"
    }
  ]
}
No extra commentary, no code fences.
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const parsed = sanitizeQuiz(raw);

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini returned invalid JSON", raw: err.message });
  }
});

// --------------------
// Generate Feedback Endpoint
// --------------------
app.post("/api/generate-feedback", async (req, res) => {
  try {
    const { score, topic } = req.body;

    const prompt = `
The user scored ${score}/100 in a quiz on "${topic}".
Return JSON only in this format:
{
  "score": number,
  "message": "string"
}
Give an encouraging, short message (1-3 sentences), no extra text.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text);

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini returned invalid JSON", raw: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
