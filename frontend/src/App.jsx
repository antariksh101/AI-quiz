import React, { useState } from "react";
import TopicSelect from "./pages/TopicSelect";
import QuizGeneration from "./pages/QuizGeneration";
import QuizPlay from "./pages/QuizPlay";
import Results from "./pages/Results";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [screen, setScreen] = useState("select");
  const [topic, setTopic] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-yellow-400">
            Knowledge Quiz
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {screen === "select" && (
          <TopicSelect
            onChoose={(t) => {
              setTopic(t);
              setScreen("generating");
            }}
          />
        )}

        {screen === "generating" && topic && (
          <QuizGeneration
            topic={topic}
            onBack={() => setScreen("select")}
            onSuccess={(resp) => {
              setQuizData(resp);
              setScreen("play");
            }}
          />
        )}

        {screen === "play" && quizData && (
          <QuizPlay
            data={quizData}
            onFinish={(scorePercent) => {
              setScore(scorePercent);
              setScreen("result");
            }}
          />
        )}

        {screen === "result" && topic && (
          <Results
            topic={topic}
            scorePercent={score}
            onRestart={() => {
              setTopic(null);
              setQuizData(null);
              setScore(0);
              setScreen("select");
            }}
          />
        )}
      </main>
    </div>
  );
}