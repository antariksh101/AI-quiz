import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --------------------
// Generate Quiz Endpoint
// --------------------
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate exactly 5 multiple-choice questions on the topic "${topic}".
Return strict JSON in this format:
{
  "questions": [
    {
      "question": "string",
      "options": ["A","B","C","D"],
      "answer": "string"
    }
  ]
}
Only return valid JSON, no extra text.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      return res.status(500).json({ error: "Gemini returned invalid JSON", raw: content });
    }

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// Generate Feedback Endpoint
// --------------------
app.post("/api/generate-feedback", async (req, res) => {
  try {
    const { score, total } = req.body;

    const prompt = `
The user scored ${score}/${total}.
Generate a short motivational feedback message in JSON:
{ "feedback": "string" }
Only return valid JSON, no extra text.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      return res.status(500).json({ error: "Gemini returned invalid JSON", raw: content });
    }

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
