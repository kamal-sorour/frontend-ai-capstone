# 🚀 Frontend AI Capstone Project

A modern, highly responsive web application built as an AI-powered frontend capstone project. It leverages modern web technologies to deliver an interactive, intelligent, and seamless user experience.

---

## ✨ Tech Stack

| Technology | Description |
|------------|-------------|
| ⚛️ Framework | Next.js (React) |
| 🎨 Styling | Tailwind CSS |
| 🧹 Linting | ESLint |
| 💎 Formatting | Prettier |

---

# 🛠️ Getting Started

Follow these steps to run the project locally.

## Prerequisites

Make sure you have:

- Node.js **v18.x** or higher
- npm (comes with Node.js)

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/frontend-ai-capstone.git
cd frontend-ai-capstone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## 🌐 Open the Application

Visit the following URL in your browser:

```text
http://localhost:3000
```

---

# 📐 Development Standards

To keep the project clean, scalable, and easy to maintain, please follow these conventions.

---

## 📝 Commit Convention

This project follows the **Conventional Commits 1.0.0** specification.

| Type | Description |
|------|-------------|
| `feat:` | Introduce a new feature |
| `fix:` | Fix a bug |
| `docs:` | Documentation updates |
| `style:` | Formatting or style changes (no logic changes) |
| `refactor:` | Code improvements without changing behavior |
| `test:` | Add or update tests |
| `chore:` | Maintenance tasks and tooling updates |

### Example

```bash
feat: add AI chat interface
fix: resolve hydration warning
style: format README headers and polish documentation
refactor: simplify authentication flow
```

---

## Tool Contract (FE-07)
* **Tool Name:** `evaluate_answer`
* **Description:** Evaluates technical interview answers and generates a visual score card.
* **Schema:** Zod object containing `score` (0-100), `feedback` (string), and `strengths` (array of strings).
* **Return Shape:** Renders as an interactive UI component handling 4 distinct states (Loading, Result, Error) directly in the chat stream, avoiding raw JSON dumps.

## 🎯 Code Quality

The project uses:

- ✅ ESLint for code quality
- ✅ Prettier for automatic formatting

Before creating a Pull Request, make sure to format your code.

---

# 📂 Project Structure

```text
frontend-ai-capstone/
│
├── app/
├── components/
├── public/
├── styles/
├── package.json
└── README.md
```

---

# 🤝 Contributing

Contributions are welcome.

Please make sure your code follows the project's coding standards and commit message conventions before submitting a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for more information.

---

<div align="center">

Made with ❤️ using **Next.js** & **Tailwind CSS**

</div>