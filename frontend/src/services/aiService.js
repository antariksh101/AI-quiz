// src/services/aiService.js

const AI_API_URL = "https://your-ai-endpoint.example/generate"; // replace with real endpoint

async function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    // try to extract the first {...} block
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first >= 0 && last > first) {
      const sub = text.slice(first, last + 1);
      return JSON.parse(sub);
    }
    throw err;
  }
}

async function postAI(payload) {
  // DEVELOPMENT NOTE: If you want to mock, replace this function body with the mock below (comment real fetch)
  const res = await fetch(AI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.REACT_APP_AI_KEY}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI API error: ${res.status} ${text}`);
  }
  return res.text();
}

/* ====== MOCK helper for local dev ======
Uncomment this function and comment out the real postAI for local work without keys.

async function postAI(payload) {
  await new Promise(r => setTimeout(r, 700));
  const topic = payload.prompt && payload.prompt.topic ? payload.prompt.topic : "Sample";
  const mock = {
    topic,
    questions: Array.from({length:5}).map((_, i) => ({
      id: `q${i+1}`,
      question: `Sample question ${i+1} about ${topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctOptionIndex: i % 4,
      explanation: "Short explanation"
    }))
  };
  return JSON.stringify(mock);
}
/*======================================== */

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
          explanation: "string (optional)"
        }
      ]
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
        if (!q.question || !Array.isArray(q.options) || typeof q.correctOptionIndex !== "number") {
          throw new Error(`Invalid question at index ${i}`);
        }
      });
      return parsed;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) {
        // small delay before retry
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
    }
  }
  throw lastErr;
}

export async function generateFeedback(scorePercent, topic, maxRetries = 1) {
  const prompt = {
    task: "feedback_message",
    topic,
    scorePercent,
    format: "json",
    schema: {
      score: "number",
      message: "string"
    },
    instruction:
      "Return ONLY valid JSON with score (number) and an encouraging custom message as `message`. Keep it concise (1-3 sentences). No extra text.",
  };

  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await postAI({ prompt });
      const parsed = await safeJsonParse(raw);
      if (typeof parsed.score !== "number" || typeof parsed.message !== "string") {
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
