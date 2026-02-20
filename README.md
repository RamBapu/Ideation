# 🚀 Ideation — AI-Powered Notes Web Application

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-orange)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-green)
![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

> A full-stack, AI-enhanced notes application built with **Next.js 16**, **TypeScript**, and modern production-grade tools.

🔗 **Live App:** https://ideation-notes-app.vercel.app

📦 **Repository:** https://github.com/RamBapu/Ideation

🚀 **Deployed on:** Vercel

---

## 📌 Project Overview

**Ideation** is a production-ready full-stack notes application that enables users to create, edit, and manage ideas with AI-powered enhancements.

This project demonstrates:

- 🔐 Secure authentication architecture
- 🧠 AI-assisted content generation
- 🎨 AI image generation
- 📝 Rich text editing with autosave
- ⚡ Optimized server-state management
- 🗄 Type-safe database interactions
- 🧱 Clean serverless backend architecture

Designed using real-world SaaS architecture principles.

---

# 🧠 Core Features

## 🔐 Authentication

- Implemented using **Clerk**
- Secure session management
- Route protection & user-specific data isolation

## 📝 Full CRUD Notes System

- Create, Read, Update, Delete notes
- Rich text formatting using **Tiptap Editor**
- Debounced auto-save to reduce database load

## ✨ AI Capabilities

### 🤖 Text Autocomplete

- Integrated with **Google Gemini**
- Context-aware AI content suggestions

### 🎨 Image Generation

- Powered by **Pollinations.ai**
- Generate AI images directly within notes

---

# 🛠 Tech Stack

### Frontend

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Lucide React
- Framer Motion

### Backend

- Next.js API Routes (`/app/api`)
- PostgreSQL (Neon Serverless)
- Drizzle ORM

### Data & State

- Axios
- TanStack React Query

### Authentication

- Clerk

---

# 🔍 Architecture Explanation

### 1️⃣ Frontend Layer

- Built using **Next.js App Router**
- Type-safe components with TypeScript
- UI powered by Tailwind + ShadCN
- Rich text editing using Tiptap
- Lucide React for scalable icons

### 2️⃣ Authentication Layer

- Clerk handles session management
- Middleware-secured API routes
- User-scoped database queries

### 3️⃣ API Layer

- Implemented via Next.js API routes
- Serves as a secure backend gateway
- Handles:
  - Notes CRUD
  - AI integrations
  - Auth validation

### 4️⃣ Database Layer

- PostgreSQL (Neon serverless)
- Drizzle ORM ensures:
  - Type-safe queries
  - Clean schema management
  - Scalable DB access

### 5️⃣ AI Integration Layer

- Google Gemini for text autocomplete
- Pollinations.ai for image generation
- API keys securely handled server-side

### 6️⃣ Performance Strategy

- Debounced auto-save to reduce DB writes
- React Query caching & background updates
- Automatic code splitting via Next.js
- Serverless deployment for scalability

---

# 📂 Project Structure

```
ideation/
│
├── app/                 # App Router pages & layouts
├── app/api/             # Backend API routes
├── components/          # Reusable UI components
├── lib/                 # Utilities
├── lib/db/              # Drizzle schema & config
└── public/              # Static assets
```

---

# 🚀 Local Development

## 1️⃣ Clone Repository

```bash
git clone https://github.com/RamBapu/Ideation.git
cd Ideation
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Configure Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=

DATABASE_URL=

POLLEN_KEY=
GOOGLE_GEMINI_API_KEY=
```

## 4️⃣ Run Development Server

```bash
npm run dev
```

---

# 📦 Production Build

```bash
npm run build
npm start
```

---

# 👨‍💻 Author

**Ram Bapu**

Product Developer | Full stack Web Developer

GitHub: https://github.com/RamBapu
