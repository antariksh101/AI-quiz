🚀 AI Prompt Web App

An AI-powered React application that allows users to interact with OpenAI’s GPT API in a clean, modular, and responsive UI.
The project follows a frontend-backend separation with React (frontend) and Node.js/Express (backend).
TailwindCSS is used for styling with Dark Mode support.

📂 Project Structure
AI-Quiz/
│
├── backend/                # Node.js + Express backend
│   ├── server.js           # Main server file
│   ├── routes/
│   │   └── aiRoutes.js     # Routes for AI interaction
│   ├── controllers/
│   │   └── aiController.js # AI logic
│   └── package.json
│
├── frontend/               # React frontend (Vite/CRA)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── App.js          # Main App
│   │   └── index.js
│   ├── tailwind.config.js  # Tailwind config (Dark mode enabled)
│   └── package.json
│
├── README.md
└── package.json

⚙️ Setup Instructions
🔹 1. Clone the Repository
git clone https://github.com/your-username/ai-app.git
cd ai-app

🔹 2. Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
OPENAI_API_KEY=your_openai_api_key_here


Run backend:

node server.js

🔹 3. Frontend Setup
cd ../frontend
npm install
npm start   # CRA
# OR
npm run dev # Vite

🛠️ Features

🔹 AI Chat using OpenAI API

🔹 TailwindCSS + Dark Mode

🔹 Reusable Modular Components

🔹 Error & Loading States

🔹 Frontend + Backend separation

🔹 Async handling with Axios

🎯 Prompts Used & Refinements

We tested various prompts for quality & consistency. Example:

Prompt 1 (Initial):

Explain React in simple terms.


Output: Too generic.

Refined Prompt (Final):

Explain React in simple terms as if teaching a beginner web developer. Include analogy.


This refinement improved clarity & consistency.

🏗️ Architecture & State Management

Backend: Node.js + Express → acts as a proxy for OpenAI API (hides API key).

Frontend: React (functional components + hooks).

State Management: useState + useEffect.

Chat history stored in React state.

API requests handled via Axios with async/await.

UI: TailwindCSS for styling, dark mode enabled (class strategy).

📸 Screenshots
🔹 Chat Screen

🔹 Dark Mode

⚡ Known Issues & Improvements
Known Issues:

Long prompts may cause API delay.

No persistent history (refresh clears chat).

Potential Improvements:

Add user authentication.

Store chat history in MongoDB.

Add speech-to-text input.

Add multi-model selection (GPT-4, GPT-3.5).