import React from "react";

export default function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
        }}
      />
    </div>
  );
}
