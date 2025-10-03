import React from "react";

export default function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
      <div
        className="h-2 rounded transition-all duration-300"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
        }}
      />
    </div>
  );
}