import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function QuizPlay({ data, onFinish }) {
  const questions = data.questions;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(() =>
    Array(questions.length).fill(null)
  );

  function handleSelect(idx) {
    const copy = [...selected];
    copy[index] = idx;
    setSelected(copy);
  }

  function computeScorePercent() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.correctOptionIndex) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Topic: {data.topic}
        </h2>
        <div className="w-52">
          <ProgressBar
            value={Math.round(((index + 1) / questions.length) * 100)}
          />
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        question={questions[index]}
        selectedIndex={selected[index]}
        onSelect={handleSelect}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>

        {index < questions.length - 1 ? (
          <button
            onClick={() => setIndex(index + 1)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => onFinish(computeScorePercent())}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            Submit Quiz
          </button>
        )}
      </div>

      {/* Progress info */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Answered: {selected.filter((s) => s !== null).length}/{questions.length}
      </p>
    </div>
  );
}
