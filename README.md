<p align="center">
  <img src="https://i.ibb.co.com/9kGVF8qv/logo.png" alt="NutriSync Logo" width="120" />
</p>

<h1 align="center">NutriSync 🥗</h1>

<p align="center">
  <strong>The Intelligent AI-Powered Nutrition & Wellness Ecosystem.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=google-gemini&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Better_Auth-FF4500?style=flat-square&logo=auth0&logoColor=white" alt="Better Auth" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

---

## 📖 Overview

**NutriSync** is an advanced, enterprise-grade health platform designed to simplify nutritional tracking through artificial intelligence. By leveraging the **Google Gemini API**, NutriSync allows users to describe their meals in natural language and receive instant, precise nutritional breakdowns.

Built with a decoupled **Next.js 15 frontend** and an **Express/Prisma backend**, it delivers a seamless, performant, and visually stunning experience for both health enthusiasts and platform administrators.

---

## ✨ Key Features

- 🧠 **AI Smart Analyzer**  
  Describe any meal in plain English (e.g., *"two scrambled eggs and a latte"*) and get instant calorie and macro data powered by Gemini AI.

- 📊 **Dynamic Health Dashboards**  
  Interactive visualization of calorie trends, macro distributions, and weekly progress using Recharts.

- 🛠️ **Admin Command Center**  
  A comprehensive suite for administrators to monitor platform growth, manage user roles, and moderate recipe content with real-time analytics.

- 🍳 **Premium Recipe Marketplace**  
  Chef-curated recipe collection with advanced filtering by cuisine, difficulty, and nutritional density.

- 🔐 **Enterprise-Grade Security**  
  Secure, cross-domain session management powered by `better-auth`.

- 📱 **Ultra-Responsive UI**  
  A modern "Glassmorphism" design system optimized for mobile, tablet, and ultra-wide displays.

---

## 🔗 Important Links

| Resource | URL |
| :--- | :--- |
| 🚀 **Live Application** | https://nutri-sync-two.vercel.app |
| ⚙️ **Live API** | https://nutri-sync-backend.vercel.app/api/v1 |
| 📂 **Frontend Repository** | https://github.com/Rishad1404/nutri-sync-frontend |
| 🗄️ **Backend Repository** | https://github.com/Rishad1404/nutri-sync-backend |

---

# 🛠️ Tech Stack

## Frontend (Client-Side)

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS & Framer Motion
- **Visuals:** Recharts & Lucide React
- **Data Fetching:** TanStack Query (React Query)
- **Components:** Shadcn UI
- **Language:** TypeScript

## Backend (Server-Side)

- **Framework:** Node.js & Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **AI Integration:** Google Gemini AI API
- **Authentication:** better-auth
- **Deployment:** Vercel

---

# 🚀 Getting Started

To run NutriSync locally, you will need to set up both the backend and frontend environments.

---

# ⚙️ Backend Setup

## 1. Clone and Install

```bash
git clone https://github.com/Rishad1404/nutri-sync-backend.git
cd nutri-sync-backend
npm install
```

## 2. Environment Config (`.env`)

Create a `.env` file in the backend root directory and add:

```env
PORT=5000
DATABASE_URL="your_postgresql_url"
GEMINI_API_KEY="your_google_gemini_key"
BETTER_AUTH_SECRET="your_secret"
FRONTEND_URL="http://localhost:3000"
```

## 3. Run Backend

```bash
npx prisma db push
npm run dev
```

---

# 💻 Frontend Setup

## 1. Clone and Install

```bash
git clone https://github.com/Rishad1404/nutri-sync-frontend.git
cd nutri-sync-frontend
npm install
```

## 2. Environment Config (`.env.local`)

Create a `.env.local` file in the frontend root directory and add:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 3. Run Frontend

```bash
npm run dev
```

---

# 📁 Project Structure

```bash
NutriSync/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── public/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── modules/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   └── server.ts
│
└── README.md
```

---

# 🔐 Environment Variables

## Backend

| Variable | Description |
| :--- | :--- |
| `PORT` | Backend server port |
| `DATABASE_URL` | PostgreSQL database connection string |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `BETTER_AUTH_SECRET` | Secret key for authentication |
| `FRONTEND_URL` | Frontend application URL |

## Frontend

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_APP_URL` | Frontend application URL |

---

# 🌟 Core Functionalities

- AI-powered meal analysis
- Calorie and macro tracking
- User authentication & authorization
- Admin analytics dashboard
- Recipe marketplace
- Responsive and animated UI
- Secure API integration
- Real-time data visualization

---

# 🚀 Deployment

NutriSync is fully deployed on **Vercel** for both frontend and backend services.

### Production URLs

- Frontend: https://nutri-sync-two.vercel.app
- Backend API: https://nutri-sync-backend.vercel.app/api/v1

---

# 👨‍💻 Author

## Md. Rishad Islam

- 🌐 [Portfolio](https://rishad-islam.vercel.app)
- 💼 [LinkedIn](https://linkedin.com/in/rishad-islam14)
- 🐙 [GitHub](https://github.com/Rishad1404)
---

<p align="center">
  <strong>NutriSync — Precision health for a modern world.</strong>
</p>
