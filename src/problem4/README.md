# CRUD API with ExpressJS, TypeScript and Prisma

A RESTful API server built with ExpressJS, TypeScript, and Prisma ORM, featuring a clean architecture with BaseRepository and BaseService patterns for data persistence and business logic.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ TypeScript for type safety
- ✅ Prisma ORM for database management
- ✅ Clean architecture with Base classes (Repository & Service patterns)
- ✅ SQLite database for data persistence
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Filtering and search capabilities
- ✅ CORS enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite
- **Dev Tools**: ts-node-dev for hot reload

## Project Structure

```
problem4/
├── prisma/
│   ├── schema.prisma            # Prisma schema definition
│   └── seed.ts                  # Database seeding script
├── src/
│   ├── base/
│   │   ├── BaseRepository.ts    # Base repository with common CRUD operations
│   │   └── BaseService.ts       # Base service with business logic
│   ├── config/
│   │   ├── database.ts          # Prisma client configuration
│   │   └── initDatabase.ts      # Database connection test
│   ├── controllers/
│   │   └── ResourceController.ts # HTTP request handlers
│   ├── entities/
│   │   └── Resource.ts          # Entity interface definitions
│   ├── middlewares/
│   │   └── errorHandler.ts      # Error handling middleware
│   ├── repositories/
│   │   └── ResourceRepository.ts # Resource-specific database operations
│   ├── routes/
│   │   └── resourceRoutes.ts    # API route definitions
│   ├── services/
│   │   └── ResourceService.ts   # Business logic for resources
│   └── index.ts                 # Application entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the project directory:
```bash
cd src/problem4
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. (OptioURL="file:./dev.db"
NODE_ENV=development
```

5. Initialize Prisma and generate client:
```bash
npm run prisma:generate
```

6. Run database migrations:
```bash
npm run prisma:migrate
```

7. (Optional) Seed the database with sample data:
```bash
npm run prisma:seed
PORT=3000
DATABASE_PATH=./database.db
NODE_ENV=development
```

## Running the Application

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
# Build the project
npm run build

# Start the server
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Resource Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | Get all resources (with optional filters) |
| GET | `/api/resources/:id` | Get a specific resource by ID |
| POST | `/api/resources` | Create a new resource |
| PUT | `/api/resources/:id` | Update a resource |
| DELETE | `/api/resources/:id` | Delete a resource |
| GET | `/api/resources/count` | Get count of resources |

### Query Parameters (GET /api/resources)

- `category` - Filter by category
- `status` - Filter by status
- `search` - Search by name (partial match)

### Request/Response Examples

#### 1. Create a Resource
```bash
POST /api/resources
Content-Type: application/json

{
  "name": "My Resource",
  "description": "A sample resource",
  "category": "example",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "My Resource",
    "description": "A sample resource",
    "category": "example",
    "status": "active",
    "created_at": "2026-01-09 10:30:00",
    "updated_at": "2026-01-09 10:30:00"
  },
  "message": "Resource created successfully"
}
```

#### 2. Get All Resources
```bashAt": "2026-01-09T10:30:00.000Z",
      "updatedAt": "2026-01-09T10:30:00.000Z
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "My Resource",
      "description": "A sample resource",
      "category": "example",
      "status": "active",
      "createdAt": "2026-01-09T10:30:00.000Z",
      "updatedAt": "2026-01-09T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### 3. Get Resource by ID
```bash
GET /api/resources/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "My Resource",
    "description": "A sample resource",
    "category": "example",
    "status": "active",
    "createdAt": "2026-01-09T10:30:00.000Z",
    "updatedAt": "2026-01-09T10:30:00.000Z"
  }
}
```

#### 4. Update a Resource
```bash
PUT /api/resources/1
Content-Type: application/json

{
  "name": "UAt": "2026-01-09T10:30:00.000Z",
    "updatedAt": "2026-01-09T10:35:00.000Z
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Resource",
    "description": "A sample resource",
    "category": "example",
    "status": "inactive",
    "created_at": "2026-01-09 10:30:00",
    "updated_at": "2026-01-09 10:35:00"
  },
  "message": "Resource updated successfully"
}
```

#### 5. Delete a Resource
```bash
DELETE /api/resources/1
```

**Response:**
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

#### 6. Filter Resources
```bash
GET /api/resources?category=example&status=active
```

#### 7. Search Resources
```bash
GET /api/resources?search=resource
```

#### 8. Get Count
```bash
GET /api/resources/count?status=active
```

**Response:**
```json
{
  "success": true,
  "count": 5
}
```

## Architecture

### Prisma ORM
Prisma provides:
- Type-safe database queries (async)
- `findById(id)` - Find a record by ID (async)
- `findAll(filters)` - Find all records with optional filters (async)
- `update(id, data)` - Update a record (async)
- `delete(id)` - Delete a record (async)
- `count(filters)` - Count records (async)
The `BaseRepository` class provides common database operations:
- `create(data)` - Insert a new record
- `findById(id)` - Find a record by ID
- `findAll(filters)` - Find all records with optional filters
- `update(id, data)` - Update a record
- `delete(id)` - Delete a record
- `count(filters)` - Count records

### BaseService Pattern
The `BaseService` class provides business logic layer:
- Validation before create/update
- Error handling
- Wraps repository calls with async/await
- Can be extended with custom business logic

### Extending the Application

To add a new resource type:

1. Add a new model to `prisma/schema.prisma`
2. Run `npm run prisma:migrate` to create migrations
3. Run `npm run prisma:generate` to update Prisma client
4. Create an entity interface in `src/entities/`
5. Create a repository extending `BaseRepository` in `src/repositories/`
6. Create a service extending `BaseService` in `src/services/`
7. Create a controller in `src/controllers/`
8. Create routes in `src/routes/`
9. Register routes in `src/index.ts`

## Validation Rules

- `name`: Required, 3-100 characters
- `description`: Optional
- `category`: Optional
- `status`: Optional, defaults to "active"

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
Prisma ORM with SQLite. Prisma handles migrations, query building, and type generation automatically.

### Prisma Commands

```bash
# Generate Prisma Client (after schema changes)
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (visual database browser)
npm run prisma:studio

# Seed the database
npm run prisma:seed
```

### Database Schema

```prisma
model Resource {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  category    String?
  status      String   @default("active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("resources")
} status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Testing with cURL

```bash
# Create a resource
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Resource","description":"Testing","category":"test","status":"active"}'

# Get all resources
curl http://localhost:3000/api/resources

# Get resource by ID
curl http://localhost:3000/api/resources/1

# Update a resource
curl -X PUTprisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed the database with sample data/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Resource"}'

# Delete a resource
curl -X DELETE http://localhost:3000/api/resources/1

# Filter by status
curl http://localhost:3000/api/resources?status=active

# Search by name
curl http://localhost:3000/api/resources?search=test
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run init-db` - Initialize/reset database

## License

ISC
