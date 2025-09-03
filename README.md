/# MERN Project – [Your Project Name]

A full-stack MERN application built with **MongoDB, Express.js, React, and Node.js**, containerized using Docker and deployed on Render.

---

## 🚀 Live Demo

- **Frontend:** [https://your-frontend.onrender.com](https://vexocore-it-crud-jqo1.vercel.app/task)]
- **Backend API:** [[https://your-backend.onrender.com](https://vexocore-it-crud.onrender.com)] 
- **GitHub Repository:** [[https://github.com/yourusername/your-rep](https://github.com/lakshrajkumar26/vexocore-it-crud)](https://github.com/yourusername/your-repo)

---

## 📌 Features

- User Authentication (JWT-based)
- Role-based access control
- Task Management APIs
- Secure CORS configuration
- Dockerized for easy deployment
- Production-ready with Helmet, Compression, and Rate Limiting

---

## 🏗 Project Structure

my-project/
│
├── frontend/ # React (Vite or CRA)
│ ├── src/
│ ├── package.json
│ └── ...
│
└── backend/ # Express + MongoDB
├── routes/
├── models/
├── Config/
├── Dockerfile
├── package.json
└── index.js



---

## ⚙️ Tech Stack

- **Frontend:** React, Vite/CRA, Axios, TailwindCSS (if used)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Deployment:** Docker, Render
- **Security:** Helmet, express-rate-limit, CORS
- **Other Tools:** dotenv, compression

---

## 🐳 Docker Setup

### Development
```bash
# Backend
cd backend
docker build -t myapp-backend .
docker run -p 8080:8080 myapp-backend


# Frontend (if Dockerized separately)
cd frontend
docker build -t myapp-frontend .
docker run -p 5173:80 myapp-frontend



Backend
cd backend
npm install
npm start

cd frontend
npm install
npm run dev




