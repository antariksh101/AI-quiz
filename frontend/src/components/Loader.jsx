import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div
        className="w-10 h-10 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-3"
        role="status"
      />
      <span className="text-gray-700 dark:text-gray-200 font-medium">{text}</span>
    </div>
  );
}
