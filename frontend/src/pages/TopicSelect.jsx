import React from "react";

const TOPICS = [
  { id: "wellness", name: "Wellness" },
  { id: "tech", name: "Tech Trends" },
  { id: "history", name: "History" },
  { id: "science", name: "Science" },
];

export default function TopicSelect({ onChoose }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Choose a topic</h1>
      <div className="grid grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => onChoose(t.id)}
            className="p-6 border rounded bg-white dark:bg-gray-800 text-blue-600 dark:text-yellow-300 text-left transition-colors"
          >
            <h2 className="text-lg font-semibold m-0">{t.name}</h2>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              Generate a 5-question quiz on {t.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}