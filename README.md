# Smart ToDo App (Task Prioritizer)

> **AI-powered task management using Next.js, Zustand, Tailwind, and Google Gemini AI.**

A modern todo app where users can add tasks, categorize them, and **automatically generate AI-prioritized tasks** using Google's **Gemini 2.0 API**.

## System Design Diagram

 *![System Design Diagram](https://github.com/shafaet3/smart-todo-app/blob/main/diagram.jpg)*

---

## 📸 Preview

| Tasks Before Prioritization Screenshot |
| :---: | 
| *![Tasks Before Prioritization Screenshot](https://raw.githubusercontent.com/shafaet3/smart-todo/main/tasks_before_prioritize.PNG)*

| Tasks After Prioritization Screenshot |
| :---: | 
| ![Tasks After Prioritization Screenshot](https://raw.githubusercontent.com/shafaet3/smart-todo/main/tasks_after_prioritize.PNG)

---

## 🚀 Key Features

A brief glance at what this application offers:

| Icon | Feature | Description |
| :---: | :--- | :--- |
| **✔️** | **Task Management** | Add, edit, and delete tasks with ease. |
| **🤖** | **AI-Powered Prioritization** | Automatically assigns **High / Medium / Low** priority via Gemini AI. |
| **🏷️** | **Category Tagging** | Organize tasks with custom category labels. |
| **🛡️** | **Strict Validation** | **Zod-powered** schema validation for robust data integrity. |
| **⚛️** | **Global State** | Efficient state management using **Zustand**. |
| **🔔** | **Notifications** | Beautiful, dismissible Toast notifications styled with Tailwind. |
| **⚙️** | **Architecture** | Clean, API-driven architecture for scalability. |
| **✍️** | **Typing** | Fully typed codebase with **TypeScript** for developer confidence. |

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone [https://github.com/shafaet3/smart-todo-app.git](https://github.com/shafaet3/smart-todo-app.git) 
cd smart-todo-app

```
### 2️⃣ Go to Frontend Dir to Install dependencies
```bash
cd smart-todo-frontend
npm install

```
### 3️⃣ Run the Frontend Project Locally
```bash
npm run dev

```
### 4️⃣ Go to Backend Dir to Install dependencies
```bash
cd smart-todo-backend
npm install

```
### 5️⃣ create .evn file at the root dir and add environment variables
```bash
PORT=4000
NODE_ENV=development
GEMINI_API_KEY=PASE_YOUR_API_KEY_HERE

```
### 6️⃣ Get your Gemini AI api key from here 
```bash
Obtaining a Gemini API key is a straightforward process handled through Google AI Studio. Here is the step-by-step guide:

1️⃣ Visit Google AI Studio Go to the official Google AI Studio website. This is the primary platform for developers to experiment with Gemini models and manage their credentials.

2️⃣ Sign In with Your Google Account Click the "Sign in" button. You can use your standard Gmail or Google Workspace account.

3️⃣ Accept the Terms of Service If it is your first time visiting, a pop-up will appear. Review and accept the Generative AI Terms of Service to proceed to the dashboard.

4️⃣ Locate the API Keys Section On the left-hand sidebar menu, look for the option labeled "Get API key" (often represented by a key icon 🔑). Click on it to open the key management page.

5️⃣ Click "Create API key" You will see a prominent button that says "Create API key". Click this to begin the generation process.

6️⃣ Select Your Project A dialog box will appear with two options:

Create API key in new project: Recommended for beginners; Google will set up a background Cloud project for you automatically.

Create API key in existing project: Choose this if you want to link the key to a specific project you already have in Google Cloud.

7️⃣ Copy Your Key Once generated, your unique API key (usually starting with AIza...) will be displayed. Click the "Copy" button immediately.

8️⃣ Save It Securely Store your key in a safe place, such as a password manager or an environment variable file (.env). Never hardcode your API key directly into public scripts or upload it to GitHub.

```
### 7️⃣ Run the Backend Project Locally
```bash
npm run dev

```
