# Customer API

A RESTful API backend service built with ExpressJS, TypeScript, and Prisma for managing customer resources with full CRUD operations.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, and Delete customers
- **Filtering**: List customers with optional filters (name, email, phone)
- **TypeScript**: Fully typed codebase for better development experience
- **Prisma ORM**: Type-safe database access with SQLite
- **Base Architecture**: Reusable base classes for Repository, Service, and Controller patterns
- **Input Validation**: Request validation middleware
- **Error Handling**: Centralized error handling
- **CORS Enabled**: Cross-origin resource sharing support

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   The default configuration uses SQLite:
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
   
   When prompted, enter a migration name (e.g., "init")

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:3000` with hot-reload enabled.

### Production Mode
```bash
npm run build
npm start
```

## 📚 API Endpoints

Base URL: `http://localhost:3000/api`

### Health Check
```
GET /api/health
```
Returns API status and timestamp.

### Customer Endpoints

#### 1. Create a Customer
```
POST /api/customers
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-09T10:00:00.000Z",
    "updatedAt": "2024-01-09T10:00:00.000Z"
  },
  "message": "Resource created successfully"
}
```

#### 2. List All Customers (with optional filters)
```
GET /api/customers
GET /api/customers?name=John
GET /api/customers?email=john@example.com
GET /api/customers?phone=1234567890
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St, City, Country",
      "createdAt": "2024-01-09T10:00:00.000Z",
      "updatedAt": "2024-01-09T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### 3. Get Customer by ID
```
GET /api/customers/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-09T10:00:00.000Z",
    "updatedAt": "2024-01-09T10:00:00.000Z"
  }
}
```

#### 4. Update Customer
```
PUT /api/customers/:id
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+0987654321"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+0987654321",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-09T10:00:00.000Z",
    "updatedAt": "2024-01-09T10:05:00.000Z"
  },
  "message": "Resource updated successfully"
}
```

#### 5. Delete Customer
```
DELETE /api/customers/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-09T10:00:00.000Z",
    "updatedAt": "2024-01-09T10:00:00.000Z"
  },
  "message": "Resource deleted successfully"
}
```

## 🏗️ Project Structure

```
src/
├── config/
│   └── database.ts          # Database configuration and connection
├── controllers/
│   ├── base.controller.ts   # Base controller with CRUD methods
│   └── customer.controller.ts
├── middleware/
│   ├── error.middleware.ts  # Error handling middleware
│   └── validation.middleware.ts
├── repositories/
│   ├── base.repository.ts   # Base repository pattern
│   └── customer.repository.ts
├── routes/
│   ├── index.ts             # Main router
│   └── customer.routes.ts   # Customer routes
├── services/
│   ├── base.service.ts      # Base service with business logic
│   └── customer.service.ts
└── index.ts                 # Application entry point

prisma/
└── schema.prisma            # Database schema definition
```

## 🧪 Database Management

### View Database with Prisma Studio
```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` to view and edit your database.

### Create a New Migration
```bash
npm run prisma:migrate
```

## 🎨 Architecture Patterns

This project implements a **layered architecture** with base classes for reusability:

1. **Repository Layer** (`BaseRepository`): Handles data access
2. **Service Layer** (`BaseService`): Contains business logic
3. **Controller Layer** (`BaseController`): Handles HTTP requests/responses

Each resource (like Customer) extends these base classes, promoting code reuse and maintainability.

## 🔒 Validation

- **Email uniqueness**: Enforced at database level and application level
- **Required fields**: Name and email are required for creation
- **Email format**: Valid email format is enforced
- **Input sanitization**: Validates data types and formats

## 🐛 Error Handling

All errors are handled by the centralized error middleware:
- Returns consistent error response format
- Includes stack trace in development mode
- Handles 404 routes
- Returns appropriate HTTP status codes

## 📝 Example cURL Commands

### Create Customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "address": "456 Oak Ave"
  }'
```

### List Customers
```bash
curl http://localhost:3000/api/customers
```

### Get Customer by ID
```bash
curl http://localhost:3000/api/customers/{customer-id}
```

### Update Customer
```bash
curl -X PUT http://localhost:3000/api/customers/{customer-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Updated",
    "phone": "+0987654321"
  }'
```

### Delete Customer
```bash
curl -X DELETE http://localhost:3000/api/customers/{customer-id}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio GUI

## 📄 License

ISC

## 👤 Author

Your Name

---

**Note**: This is a development setup using SQLite. For production, consider using PostgreSQL or MySQL by updating the `DATABASE_URL` in `.env` and the `provider` in `prisma/schema.prisma`.
