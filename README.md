
# 🧩 Mini Jira — Task Management Web App

> A lightweight **Task Management (Mini Jira)** web application to plan, track, and deliver work
fast — built to be shipped in 7 days.

This repo contains a full-stack implementation of a Trello/Jira-like board with user auth, drag-and-drop task
boards, persistent storage, and RESTful APIs.

Built with **React + TailwindCSS / Material UI**, deployed on **Netlify (frontend)**.  

---

## ✨ Features

- 🔐 **Authentication** — User register, login, logout (JWT-based).
- 📋 **Task CRUD** — Create, Read, Update, Delete tasks.
- 🏷 **Task Model** — Each task has: title, description, priority, status (To Do, In Progress, Done), and deadline.
- 🎛 **Drag & Drop** — Move tasks between status columns like Trello/Jira.
- 📱 **Responsive UI** — Works seamlessly on desktop and mobile.
- 💾 **Database** — Persistent storage in MongoDB. 

---

## 🏗️ Tech Stack  

### **Frontend (React + Vite)**  
- ⚛️ React (with Vite)  
- 🎨 TailwindCSS / Material UI for styling
- 📋 React Dnd for drag-and-drop
- 🔗 Axios (API calls)  
- 🌍 Deployed on **Netlify**  

### **Backend (Node + Express)**  
- 🗄️ Node.js + Express
- 🔐 JWT for auth, bcrypt for password hashing
- 📦 Database: MongoDB (Mongoose)

---

## 📂 Project Structure  

```

taskmanage/
│── frontend/ # React + Vite + Tailwind (UI)
│── backend/ # Node.js + Express + MongoDB (API)

````

---

## 🚀 Getting Started  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/ankitadubey2004/taskmanage
cd taskmanage
````

### 2️⃣ Setup Backend
```bash
cd backend
cp .env.example .env   # update DB_URL, JWT_SECRET, PORT
npm install
npm start
```
Backend runs at → http://localhost:5000

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at → http://localhost:5173

---

## 🌐 Deployment

### Frontend → Netlify

* Framework: **Vite + React**
* Build Command: npm run build
* Publish the build folder

---

## 🧑‍🤝‍🧑 Contributing

Contributions are welcome 🎉

1. Fork the repo
2. Create a new branch (`feature/amazing-feature`)
3. Commit your changes
4. Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License** – free to use!

---

### 🎉 Pro Tip

If you like this project, **leave a star ⭐ on GitHub** — it helps the project grow!

