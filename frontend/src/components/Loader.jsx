import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="mr-3 w-6 h-6 border-4 border-gray-200 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-100 rounded-full animate-spin"
      />
      <span className="text-gray-700 dark:text-gray-200">{text}</span>
    </div>
  );
}