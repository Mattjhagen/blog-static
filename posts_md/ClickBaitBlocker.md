# ClickBaitBlocker

A full-stack application designed to analyze content and identify potential clickbait. The project is built with a modern tech stack, featuring a React frontend and a Node.js/Express backend.

## ✨ Features

*   **Content Analysis:** Submit content or URLs for clickbait analysis.
*   **Results Display:** View detailed analysis results.
*   **Responsive UI:** A modern user interface built with React and Tailwind CSS.

## 🚀 Tech Stack

*   **Frontend:**
    *   [React](https://react.dev/)
    *   [Vite](https://vitejs.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Shadcn/ui](https://ui.shadcn.com/)
    *   [React Query](https://tanstack.com/query/latest) for data fetching
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [TypeScript](https://www.typescriptlang.org/)
*   **Database:**
    *   [Drizzle ORM](https://orm.drizzle.team/)
    *   [Neon](https://neon.tech/)

## 📦 Getting Started

### Prerequisites

*   Node.js (v20.x or later recommended)
*   npm or a compatible package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mattjhagen/Clickbaitblocker.git
    cd Clickbaitblocker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add any necessary environment variables (e.g., database connection strings, API keys).

4.  **Run the development server:**
    This command starts both the frontend and backend servers concurrently.
    ```bash
    npm run dev
    ```

### Other Scripts

*   **Build for production:**
    ```bash
    npm run build
    ```

*   **Start production server:**
    ```bash
    npm run start
    ```

*   **Type checking:**
    ```bash
    npm run check
    ```

## 📁 Project Structure

```
.
├── client/      # React frontend application
├── server/      # Express.js backend API
└── shared/      # Shared code/types between client and server
```
