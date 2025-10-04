import React from "react";

export default function QuestionCard({ question, selectedIndex, onSelect }) {
  return (
    <div className="p-6 border rounded-2xl bg-white dark:bg-gray-800 shadow-md transition-colors">
      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          const selected = selectedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`w-full text-left px-4 py-2 rounded-lg border transition-colors duration-200
                ${selected
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
