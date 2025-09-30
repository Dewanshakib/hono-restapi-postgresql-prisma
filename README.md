

# ⚡ TypeSafe REST API with JWT Auth & Prisma (Hono + TypeScript)

A fully functional, **type-safe REST API** built with **Hono** and **TypeScript**, featuring **JWT-based authentication** with **HttpOnly cookies**, **password hashing using Node.js built-in Crypto**, and full **CRUD** operations for a `Post` model backed by **PostgreSQL via Prisma ORM**.

This project is perfect as a **lightweight, high-performance backend foundation** for modern web apps or for learning production-grade backend patterns with Hono.

---

## 💡 Why Hono Instead of Express?

I chose **Hono** because it’s:

* 🚀 **Much faster** — built on Web Standards (Fetch API) and optimized for speed
* 📦 **Lightweight** — tiny footprint with only the essentials
* 🛠️ **Modern & TypeScript-first** — no need for extra typings like in Express
* 🌍 **Cross-platform** — runs on Node.js, Bun, Deno, Cloudflare Workers, Vercel Edge, etc.
* 🧩 **Built-in helpers** — JWT, cookies, validation, CORS, CSRF Protection without installing dozens of middlewares

Simply put: **Hono gives Express-like simplicity but with cutting-edge performance** — perfect for modern backends.

---

## 🚀 Tech Stack

* ⚡ **Hono** (ultra-fast web framework)
* 🔐 **JWT Authentication** (Hono JWT middleware)
* 🍪 **Hono Cookie Helper** (secure cookie handling)
* 🧠 **TypeScript** (full type safety)
* 🗃️ **Prisma ORM** (PostgreSQL)
* 🔑 **Node.js Crypto** (for password hashing)

---

## 🔐 Features

* ✅ User registration & login with secure JWT HttpOnly cookies
* 🛡️ Middleware-protected routes with role/user checks
* 🧾 Type-safe CRUD operations for `Post` model
* 🔑 Password hashing with **Node.js crypto** (PBKDF2/SHA256)
* 📬 Access token handling
* 🧩 Clean, modular MVC-style folder structure

---

## 🧱 Models

### 🧑‍💻 User

```prisma
model User {
  id       String  @id @default(uuid())
  email    String  @unique
  password String
  posts    Post[]
}
```

### 📝 Post

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])
}
```

---

## 📁 Project Structure

```plaintext
src/
│
├── controllers/     # Route handlers
├── routes/          # API routes
├── middlewares/     # Auth & error handlers
├── prisma/          # Prisma client
├── utils/           # Helper functions
└── index.ts         # App entry point
```

---

# 🛠️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Dewanshakib/hono-restapi-postgresql-prisma
cd your-repo-name
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Configure environment variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="yourSuperSecret"
```

### 4️⃣ Initialize Prisma & run migrations

```bash
pnpm dlx prisma init --datasource-provider postgresql
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init 
```

### 5️⃣ Start the dev server

```bash
pnpm dev
```

---

# 📬 API Endpoints

### Auth

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/v1/users/register` | Register new user      |
| POST   | `/api/v1/users/login`    | Login + set JWT cookie |
| POST   | `/api/v1/users/logout`   | Logout user            |
| GET    | `/api/v1/users/session`  | Get current session    |

### Posts

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/v1/posts/get/all`        | Get all posts (protected) |
| POST   | `/api/v1/posts/create`     | Create a new post         |
| GET    | `/api/v1/posts/get/:id`        | Get post by ID            |
| PUT    | `/api/v1/posts/update/:id` | Update post (owner only)  |
| DELETE | `/api/v1/posts/delete/:id` | Delete post (owner only)  |

---

## 💡 Next Improvements (TODOs)

* Add forgot/reset password
* Implement refresh token rotation
* Add pagination to posts
* Integrate Redis for caching
* Rate-limit auth routes

---

# 🌐 Live Demo

Live link: https://hono-restapi-postgresql-prisma.onrender.com/


