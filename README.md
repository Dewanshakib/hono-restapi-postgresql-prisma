

# ⚡ TypeSafe REST API with JWT Auth & Prisma (Hono + TypeScript)

A fully functional, **type-safe REST API** built with **Hono** and **TypeScript**, featuring **JWT-based authentication** with **HttpOnly cookies**, **password hashing using Node.js built-in Crypto**, and full **CRUD** operations for a `Post` model backed by **PostgreSQL via Prisma ORM**.

This project is perfect as a **lightweight, high-performance backend foundation** for modern web apps or for learning production-grade backend patterns with Hono.

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
├── types/           # TypeScript types
└── index.ts         # App entry point
```

---

# 🛠️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
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
PORT="5000" 
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
| POST   | `/api/register` | Register new user      |
| POST   | `/api/login`    | Login + set JWT cookie |
| POST   | `/api/logout`   | Logout user            |
| GET    | `/api/session`  | Get current session    |

### Posts

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/posts/all`        | Get all posts (protected) |
| POST   | `/api/posts/create`     | Create a new post         |
| GET    | `/api/posts/:id`        | Get post by ID            |
| PUT    | `/api/posts/update/:id` | Update post (owner only)  |
| DELETE | `/api/posts/delete/:id` | Delete post (owner only)  |

---

## 💡 Next Improvements (TODOs)

* Add forgot/reset password
* Implement refresh token rotation
* Add pagination to posts
* Integrate Redis for caching
* Rate-limit auth routes

---

# 🌐 Live Demo

Coming soon...


