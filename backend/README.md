# Placement Tracker Backend

Node.js + Express + MySQL backend for Placement Tracker System.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MySQL Database
1. Create a MySQL database:
```sql
CREATE DATABASE IF NOT EXISTS placement_tracker DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

2. Run the complete SQL schema (provided separately) to create all tables.

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=placement_tracker
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Placements
- `GET /api/placements` - Get all placements
- `GET /api/placements/:id` - Get placement by ID
- `POST /api/placements` - Create new placement
- `PUT /api/placements/:id` - Update placement
- `DELETE /api/placements/:id` - Delete placement

### Trainings
- `GET /api/trainings` - Get all trainings
- `GET /api/trainings/:id` - Get training by ID
- `POST /api/trainings` - Create new training
- `PUT /api/trainings/:id` - Update training
- `DELETE /api/trainings/:id` - Delete training

### Feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/:id` - Get feedback by ID
- `POST /api/feedback` - Create new feedback
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback

### Admin
- `POST /api/admin/register` - Create new admin
- `POST /api/admin/login` - Admin login (returns JWT token)

## Request/Response Examples

### Create Student
```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "branch": "Computer Science",
  "email": "john@example.com",
  "phone": "1234567890",
  "cgpa": 8.5
}

Response:
{
  "success": true,
  "message": "Student created successfully",
  "id": 1
}
```

### Admin Login
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com"
  }
}
```
