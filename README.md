# 🛡️ SentinelAI — Smart Contract Auditor

SentinelAI is an AI-powered smart contract auditor that leverages the Gemini 1.5 Flash model to analyze Solidity code and detect common vulnerabilities. With a sleek frontend built using **Next.js**, **Tailwind CSS**, and animated loading experiences, developers can instantly audit bytecode for critical flaws before deploying on-chain.

[SentinelAI Screenshot]
<img width="1680" height="933" alt="Screenshot 2025-07-23 at 6 08 05 PM" src="https://github.com/user-attachments/assets/6bedb6d8-187d-4876-9ae8-7aa74a091ceb" />

---

## 🚀 Features

- 🔍 **AI-Powered Audit** — Uses Gemini to scan smart contract bytecode for vulnerabilities like reentrancy, overflow, etc.
- 📜 **Detailed Reports** — Returns a markdown-formatted security report with highlighted issues.
- ⚡ **Smooth UX** — Multi-step animated loader mimics real audit steps (e.g., analyzing bytecode, consulting AI model).
- 🌗 **Dark Mode Friendly** — Fully responsive and styled for light/dark themes.

---

## ✨ Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), TypeScript
- **AI Backend**: Google Gemini 1.5 Flash API
- **UI Enhancements**: Framer Motion, Hero Hover Effects, Tabler Icons

---

## 🧪 How It Works

1. User pastes smart contract bytecode or Solidity code.
2. On submission, the frontend sends a POST request to `/api/audit`.
3. The backend uses Gemini to analyze the code and return a vulnerability report.
4. The report is cleaned using `remove-markdown` and displayed nicely in the UI.

---

## Future Improvements
✅ Bytecode → AST decompilation for deeper analysis

🧠 Fine-tuned Gemini prompts for DeFi contracts

💾 Save audit history with IPFS or database

🌐 Multi-language support


Built for ChainOperaAI, submitted under the AI & Blockchain category.


