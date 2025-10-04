import React, { useState } from "react";
import TopicSelect from "./pages/TopicSelect";
import QuizGeneration from "./pages/QuizGeneration";
import QuizPlay from "./pages/QuizPlay";
import Results from "./pages/Results";
import ThemeToggle from "./components/ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [screen, setScreen] = useState("select");
  const [topic, setTopic] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);

  const transitionProps = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-yellow-400">
            Knowledge Quiz
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 flex-grow">
        <AnimatePresence exitBeforeEnter>
          {screen === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={transitionProps}
            >
              <TopicSelect
                onChoose={(t) => {
                  setTopic(t);
                  setScreen("generating");
                }}
              />
            </motion.div>
          )}

          {screen === "generating" && topic && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={transitionProps}
            >
              <QuizGeneration
                topic={topic}
                onBack={() => setScreen("select")}
                onSuccess={(resp) => {
                  setQuizData(resp);
                  setScreen("play");
                }}
              />
            </motion.div>
          )}

          {screen === "play" && quizData && (
            <motion.div
              key="play"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={transitionProps}
            >
              <QuizPlay
                data={quizData}
                onFinish={(scorePercent) => {
                  setScore(scorePercent);
                  setScreen("result");
                }}
              />
            </motion.div>
          )}

          {screen === "result" && topic && (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={transitionProps}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Animated Footer */}
      <AnimatePresence>
        <motion.footer
          key="footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 border-t p-4 mt-auto"
        >
          <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} Knowledge Quiz. All rights reserved | Designed by : Antariksh |{" "}
            <a
              href="https://github.com/antariksh101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-yellow-300 hover:underline ml-1"
            >
              GitHub
            </a>
          </div>
        </motion.footer>
      </AnimatePresence>
    </div>
  );
}
