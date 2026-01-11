# Customer API

Backend server with ExpressJS, TypeScript, and Prisma for managing customer resources.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Setup & Configuration

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   
   The `.env` file is already created with default configuration (SQLite):
   ```
   PORT=3000
   DATABASE_URL="file:./dev.db"
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

## Running the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

Server will run at: `http://localhost:3000`

API Base URL: `http://localhost:3000/api`
