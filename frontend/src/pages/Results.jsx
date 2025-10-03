import React, { useEffect, useState } from "react";
import { generateFeedback } from "../services/aiService";
import Loader from "../components/Loader";

export default function Results({ topic, scorePercent, onRestart }) {
  const [feedback, setFeedback] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    generateFeedback(scorePercent, topic, 1)
      .then((f) => {
        if (!mounted) return;
        setFeedback(f);
      })
      .catch((e) => {
        if (!mounted) return;
        setErr(String(e));
      });
    return () => { mounted = false; };
  }, [scorePercent, topic]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Your Score: {scorePercent}%</h2>
      {!feedback && !err && <Loader text="Getting custom AI feedback..." />}
      {err && (
        <div className="p-3 rounded bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200">
          Failed to get feedback: {err}
        </div>
      )}
      {feedback && (
        <div className="p-3 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <p className="italic">AI message:</p>
          <p className="mt-2">{feedback.message}</p>
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={onRestart}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Restart
        </button>
      </div>
    </div>
  );
}