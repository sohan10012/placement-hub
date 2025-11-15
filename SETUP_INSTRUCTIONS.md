# Placement Tracker System - Complete Setup Guide

## Overview
Full-stack Placement Tracker System with:
- **Backend**: Node.js + Express + MySQL
- **Frontend**: React + Vite + TypeScript
- **Database**: MySQL

---

## PART 1: DATABASE SETUP

### Step 1: Install MySQL
Make sure MySQL is installed on your system.

### Step 2: Create Database
Run the following SQL commands:

```sql
CREATE DATABASE IF NOT EXISTS placement_tracker DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE placement_tracker;

-- Students table
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    branch VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(120) NOT NULL,
    domain VARCHAR(100) NOT NULL
);

-- Placements table
CREATE TABLE IF NOT EXISTS placements (
    placement_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    company_id INT NOT NULL,
    date_placed DATE NOT NULL,
    package DECIMAL(6,2) NOT NULL,
    CONSTRAINT fk_placements_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_placements_company FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- Trainings table
CREATE TABLE IF NOT EXISTS trainings (
    training_id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(150) NOT NULL,
    trainer VARCHAR(120) NOT NULL,
    date DATE NOT NULL,
    duration VARCHAR(60) NOT NULL
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    comments TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT fk_feedback_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Admin table
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

---

## PART 2: BACKEND SETUP

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=placement_tracker
PORT=5000
JWT_SECRET=your_secret_key_change_this
```

### Step 4: Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Backend will run on: **http://localhost:5000**

### Verify Backend is Running
Open browser and go to: http://localhost:5000
You should see: `{"message": "Placement Tracker API is running", "status": "OK"}`

---

## PART 3: FRONTEND SETUP

### Step 1: Navigate to Frontend Directory
```bash
cd ..  # Go back to root directory
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Axios (if not already installed)
```bash
npm install axios
```

### Step 4: Start Frontend Server
```bash
npm run dev
```

Frontend will run on: **http://localhost:8080**

---

## PART 4: TESTING THE APPLICATION

### 1. Access the Application
Open your browser and navigate to: **http://localhost:8080**

### 2. Create Admin Account
1. Click on "Admin" in navigation
2. Click "Need an account? Register"
3. Fill in the registration form
4. After registration, login with your credentials

### 3. Add Test Data

#### Add Students
1. Navigate to "Students" page
2. Fill the form with sample data:
   - Name: John Doe
   - Branch: Computer Science
   - Email: john@example.com
   - Phone: 9876543210
   - CGPA: 8.5
3. Click "Add Student"

#### Add Companies
1. Navigate to "Companies" page
2. Fill the form:
   - Company Name: Google
   - Location: Bangalore
   - Domain: Technology
3. Click "Add Company"

#### Add Placements
1. Navigate to "Placements" page
2. Select student and company from dropdowns
3. Fill date and package
4. Click "Add Placement"

#### Add Trainings
1. Navigate to "Trainings" page
2. Fill training details
3. Click "Add Training"

#### Add Feedback
1. Navigate to "Feedback" page
2. Select student, add comments, and rating
3. Click "Add Feedback"

---

## FOLDER STRUCTURE

```
placement-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── studentModel.js
│   │   ├── companyModel.js
│   │   ├── placementModel.js
│   │   ├── trainingModel.js
│   │   ├── feedbackModel.js
│   │   └── adminModel.js
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── companyController.js
│   │   ├── placementController.js
│   │   ├── trainingController.js
│   │   ├── feedbackController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── companyRoutes.js
│   │   ├── placementRoutes.js
│   │   ├── trainingRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── adminRoutes.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
└── src/
    ├── components/
    │   └── Navigation.tsx
    ├── pages/
    │   ├── Dashboard.tsx
    │   ├── Students.tsx
    │   ├── Companies.tsx
    │   ├── Placements.tsx
    │   ├── Trainings.tsx
    │   ├── Feedback.tsx
    │   └── AdminLogin.tsx
    ├── services/
    │   └── api.ts
    └── App.tsx
```

---

## API ENDPOINTS

### Base URL: `http://localhost:5000/api`

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Companies
- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company by ID
- `POST /companies` - Create company
- `PUT /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

### Placements
- `GET /placements` - Get all placements
- `GET /placements/:id` - Get placement by ID
- `POST /placements` - Create placement
- `PUT /placements/:id` - Update placement
- `DELETE /placements/:id` - Delete placement

### Trainings
- `GET /trainings` - Get all trainings
- `GET /trainings/:id` - Get training by ID
- `POST /trainings` - Create training
- `PUT /trainings/:id` - Update training
- `DELETE /trainings/:id` - Delete training

### Feedback
- `GET /feedback` - Get all feedback
- `GET /feedback/:id` - Get feedback by ID
- `POST /feedback` - Create feedback
- `PUT /feedback/:id` - Update feedback
- `DELETE /feedback/:id` - Delete feedback

### Admin
- `POST /admin/register` - Register admin
- `POST /admin/login` - Login admin (returns JWT token)

---

## TROUBLESHOOTING

### Backend Won't Start
- Check if MySQL is running
- Verify database credentials in `.env`
- Make sure MySQL database is created
- Check if port 5000 is available

### Frontend Won't Start
- Make sure backend is running first
- Check if port 8080 is available
- Verify all npm packages are installed

### CORS Errors
- Make sure backend is running on port 5000
- Check if CORS is enabled in `server.js`

### Database Connection Error
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `placement_tracker` exists

### Cannot Add Data
- Check browser console for errors
- Verify backend is running
- Check network tab in browser DevTools

---

## PRODUCTION DEPLOYMENT

### Backend
1. Set up MySQL database on production server
2. Update `.env` with production credentials
3. Install dependencies: `npm install --production`
4. Start with PM2: `pm2 start server.js`

### Frontend
1. Build for production: `npm run build`
2. Deploy `dist` folder to hosting service
3. Update API base URL in `src/services/api.ts` to production backend URL

---

## SECURITY NOTES

1. **Change JWT_SECRET**: Use a strong, random secret key in production
2. **Environment Variables**: Never commit `.env` file to version control
3. **Database**: Use strong passwords for MySQL
4. **Admin Password**: Store as hashed (already implemented with bcrypt)
5. **CORS**: Configure CORS properly in production

---

## SUPPORT

For issues or questions:
1. Check console logs (browser and terminal)
2. Verify all services are running
3. Check database connections
4. Review API responses in browser Network tab

---

## License
MIT License - Free to use and modify
