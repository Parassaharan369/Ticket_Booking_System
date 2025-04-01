# ⚠️ To view the final code, make sure to select the main branch ⚠️

# Ticket Booking Backend

A robust ticket booking system built with Go, Fiber, and PostgreSQL. This project demonstrates a clean architecture implementation with proper separation of concerns, authentication, and database management.

## Features

- 🔐 JWT Authentication
- 🎫 Event Management
- 🎟️ Ticket Booking System
- 🔒 Protected Routes
- 🗄️ PostgreSQL Database
- 🐳 Docker Support
- 🔄 Hot Reloading
- 📝 Clean Architecture

## Tech Stack

- Go 1.22.1
- Fiber (Web Framework)
- PostgreSQL
- GORM (ORM)
- JWT (Authentication)
- Docker & Docker Compose
- Air (Hot Reloading)

## Prerequisites

- Go 1.22.1 or later
- PostgreSQL
- Docker (optional)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ticket-booking-backend.git
   cd ticket-booking-backend
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the application:
   ```bash
   go run cmd/api/main.go
   ```

### Using Docker

1. Build and run with Docker Compose:
   ```bash
   docker compose up --build
   ```

The application will be available at `http://localhost:8081`

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

### Event Endpoints

#### Create Event
```http
POST /api/event
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Summer Concert",
    "description": "Amazing summer concert",
    "date": "2024-07-01T18:00:00Z",
    "location": "Central Park",
    "total_tickets": 100,
    "price": 50.00
}
```

#### Get All Events
```http
GET /api/event
Authorization: Bearer <token>
```

#### Get Event by ID
```http
GET /api/event/:id
Authorization: Bearer <token>
```

### Ticket Endpoints

#### Book Ticket
```http
POST /api/ticket
Authorization: Bearer <token>
Content-Type: application/json

{
    "event_id": "event-uuid",
    "quantity": 2
}
```

#### Get User's Tickets
```http
GET /api/ticket
Authorization: Bearer <token>
```

## Environment Variables

```env
SERVER_PORT=8081
DB_HOST=localhost
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_SSLMODE=disable
```

## Project Structure

```
.
├── cmd/
│   └── api/
│       └── main.go
├── config/
├── db/
├── handlers/
├── middlewares/
├── models/
├── repositories/
├── services/
├── utils/
├── .env
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── go.mod
└── go.sum
```

