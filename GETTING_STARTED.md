# Installation & Getting Started Guide

## Quick Start

### Prerequisites
- **Node.js** (v14+): https://nodejs.org/
- **MongoDB**: Either local or MongoDB Atlas cloud
  - Local: https://www.mongodb.com/try/download/community
  - Cloud: https://www.mongodb.com/cloud/atlas (free tier available)

### 1. Set Up Database

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: Download installer from https://www.mongodb.com/try/download/community
# macOS: brew tap mongodb/brew && brew install mongodb-community
# Linux: Follow https://docs.mongodb.com/manual/administration/install-on-linux/

# Start MongoDB service
# Windows: mongod.exe or use MongoDB Compass
# macOS/Linux: brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a cluster
4. Copy your connection string

### 2. Configure Backend

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env and add your MongoDB connection string
# For local: MONGODB_URI=mongodb://localhost:27017/school_fees_db
# For Atlas: MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/school_fees_db
```

### 3. Install Backend Dependencies
```bash
npm install
```

### 4. Start Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
✅ Server is running on http://localhost:5000
```

### 5. Open Frontend

Open your browser and navigate to:
```
file:///path/to/frontend/index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000/frontend/
```

## Available npm Scripts

- `npm start` - Start production server
- `npm run dev` - Start with auto-reload (requires nodemon)

## System Architecture

### Backend (Node.js/Express + MongoDB)
- RESTful API server
- Mongoose ODM for database operations
- Data validation and error handling
- Port: 5000

### Frontend (HTML/CSS/JavaScript)
- Single-page application
- Responsive design
- API client for backend communication
- No build required, runs directly in browser

## Features Overview

1. **Dashboard** - Main overview with key statistics
2. **Student Management** - CRUD operations for students
3. **Payment Tracking** - Record and monitor payments
4. **Class Management** - Define classes and fees
5. **Financial Reports** - Analytics and exports

## Common Tasks

### Create a Class
1. Navigate to Classes page
2. Click "Add New Class"
3. Enter class name and annual fee
4. Save

### Add a Student
1. Go to Students page
2. Click "Add New Student"
3. Fill in all fields (name, email, phone, admission #, class, fee)
4. Save

### Record a Payment
1. Go to Payments page
2. Click "Record Payment"
3. Select student
4. Enter amount and payment method
5. Save

### View Reports
1. Click Reports in navigation
2. See summary statistics
3. Download as CSV or print

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **MongoDB won't connect** | Check if MongoDB is running; verify connection string in `.env` |
| **Port 5000 in use** | Change `PORT` in `.env` to another number (e.g., 5001) |
| **No data showing** | Ensure backend is running; check browser console for errors |
| **Frontend can't reach API** | Verify backend URL in `js/api.js` matches your server |
| **CORS errors** | Backend has CORS enabled by default; check console for details |

## Verify Everything Works

1. **Backend running**: Open http://localhost:5000/api/health in browser
   - Should show: `{"status":"Server is running","database":"Connected","timestamp":"..."}`

2. **Frontend loads**: Open frontend/index.html in browser
   - Should show dashboard with stats (all zeros initially)

3. **Create test data**:
   - Add a class: Classes → Add New Class
   - Add a student: Students → Add New Student
   - Record payment: Payments → Record Payment

## Database Information

**Collections Created:**
- `students` - Student records
- `payments` - Payment transactions
- `classes` - Class definitions

**Data Persists Automatically:**
- All changes save to MongoDB
- No additional export/import needed

## Using MongoDB Tools

**MongoDB Shell (mongosh)**
```bash
# Connect to local database
mongosh

# View databases
show dbs

# Use school database
use school_fees_db

# View collections
show collections

# Query students
db.students.find()

# Count records
db.students.countDocuments()
```

**MongoDB Compass** (Visual Tool)
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Visually browse data

## Next Steps

1. ✅ Verify MongoDB is running
2. ✅ Configure `.env` file
3. ✅ Run `npm install`
4. ✅ Start backend with `npm start`
5. ✅ Open frontend in browser
6. ✅ Create initial data
7. ✅ Generate first reports

## Getting Help

- **Backend issues**: Check server terminal output
- **Frontend issues**: Open DevTools (F12) and check console
- **Database issues**: Try MongoDB Shell or Compass to verify data
- **API issues**: Test endpoints with Postman or curl

## Database Backup (Recommended)

**MongoDB Atlas**: Automatic daily backups included

**Local MongoDB**:
```bash
# Backup
mongodump --db school_fees_db --out ./backup

# Restore
mongorestore ./backup/school_fees_db
```

---

Ready to go! Start your server and begin managing school fees. 🎓

