import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { generateQuestionsForTopic } from "../services/aiService";

export default function QuizGeneration({ topic, onSuccess, onBack }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr(null);
    generateQuestionsForTopic(topic)
      .then((resp) => {
        if (!mounted) return;
        setLoading(false);
        onSuccess(resp);
      })
      .catch((e) => {
        if (!mounted) return;
        setErr(String(e));
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [topic, onSuccess]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button onClick={onBack} className="text-blue-600 dark:text-yellow-300 mb-4">← Back</button>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Generating quiz for “{topic}”</h2>
      {loading && <Loader text="Generating 5 MCQs from AI..." />}
      {err && (
        <div className="p-3 rounded bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700">
          <p className="text-red-800 dark:text-red-200">Failed to generate quiz: {err}</p>
          <div className="mt-3">
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
