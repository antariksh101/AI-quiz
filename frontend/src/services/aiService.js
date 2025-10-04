// src/services/aiService.js
const BACKEND_API_URL = "http://localhost:5000/api";

// Safely parse JSON returned by backend
async function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first >= 0 && last > first) {
      const sub = text.slice(first, last + 1);
      return JSON.parse(sub);
    }
    throw err;
  }
}

// Strip prepended letters like "A. ", "B) ", etc.
function cleanOptions(options) {
  return options.map(opt => opt.replace(/^[A-Z]\s*[.)-]\s*/, '').trim());
}

async function postAI(endpoint, payload) {
  const res = await fetch(`${BACKEND_API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend API error: ${res.status} ${text}`);
  }

  return res.text();
}

export async function generateQuestionsForTopic(topic, maxRetries = 2) {
  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await postAI("generate-quiz", { topic });
      const parsed = await safeJsonParse(raw);

      if (!parsed.questions || parsed.questions.length !== 5)
        throw new Error("Parsed JSON missing 5 questions");

      parsed.questions.forEach((q, i) => {
        if (!q.question || !Array.isArray(q.options) || typeof q.correctOptionIndex !== "number")
          throw new Error(`Invalid question at index ${i}`);
        
        // Clean the options here
        q.options = cleanOptions(q.options);
      });

      return parsed;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw lastErr;
}

export async function generateFeedback(scorePercent, topic, maxRetries = 1) {
  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await postAI("generate-feedback", { score: scorePercent, topic });
      const parsed = await safeJsonParse(raw);

      if (typeof parsed.score !== "number" || typeof parsed.message !== "string")
        throw new Error("Invalid feedback response");

      return parsed;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw lastErr;
}
