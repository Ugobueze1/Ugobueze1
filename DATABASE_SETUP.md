# Database Setup Guide

## Overview

The School Fees Management System now uses **SQLite** as the primary database with **Sequelize** as the ORM layer.

## Prerequisites

- Node.js installed
- No external database server is required for local development
- Data is stored in `backend/data/school_fees_db.sqlite` by default

## Environment Setup

1. Create `.env` file in the `backend` directory (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Configure your SQLite database path and server values:

```env
# Optional: override the default SQLite database file path
SQLITE_PATH=./backend/data/school_fees_db.sqlite

PORT=5000
NODE_ENV=development
```

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

This will install:
- **sequelize** (^6.x) - ORM for SQL databases
- **sqlite3** (^5.x) - SQLite database driver
- **dotenv** (^16.0.3) - Environment variable management
- Other existing dependencies (express, cors, body-parser, uuid)

## Starting the Server

### For Development (with auto-reload):
```bash
npm run dev
```

### For Production:
```bash
npm start
```

The server will:
1. Load environment variables from `.env`
2. Connect to SQLite using Sequelize
3. Start listening on the configured port

## Database Schema

### Collections

#### Students Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique email format),
  phone: String (required),
  classLevel: String (required),
  admissionNumber: String (required, unique),
  feeAmount: Number (required, min: 0),
  totalPaid: Number (default: 0, min: 0),
  status: String (enum: ['pending', 'partial', 'paid']),
  createdAt: Date (default: now),
  lastUpdated: Date (auto-updated)
}
```

#### Payments Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Student),
  amount: Number (required, min: 0.01),
  paymentMethod: String (enum: ['bank_transfer', 'card', 'cash', 'mobile_money']),
  transactionId: String (optional),
  status: String (enum: ['pending', 'completed', 'failed']),
  paymentDate: Date (default: now),
  remarks: String (default: '')
}
```

#### Classes Collection
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  feeAmount: Number (required, min: 0),
  numberOfStudents: Number (default: 0, min: 0),
  createdAt: Date (default: now)
}
```

## Key Features

### Data Validation
- Schema-level validation on all models
- Email format validation
- Range validation (min/max values)
- Enum validation for status fields

### Automatic Timestamps
- `createdAt` - Automatically set on creation
- `lastUpdated` - Automatically updated on save (Student model)

### Data Relationships
- Payments reference Students via `studentId`
- Automatic population of student data in payment queries

### Indexes
- Payment collection indexed on `studentId` and `paymentDate` for efficient queries

## Common Database Operations

### Create a Student
```javascript
const student = new Student({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  classLevel: "Form 1A",
  admissionNumber: "ADM001",
  feeAmount: 5000
});
await student.save();
```

### Record a Payment
```javascript
const payment = new Payment({
  studentId: studentObjectId,
  amount: 2500,
  paymentMethod: "bank_transfer",
  transactionId: "TXN123456"
});
await payment.save();
// Automatically updates student's totalPaid and status
```

### Query Students
```javascript
// Get all students
const students = await Student.find();

// Find by admission number
const student = await Student.findOne({ admissionNumber: "ADM001" });

// Find by class level
const classStudents = await Student.find({ classLevel: "Form 1A" });

// Filter by status
const pendingStudents = await Student.find({ status: "pending" });
```

### Query Payments with Student Info
```javascript
// Get all paymnpm install
npm startnpm install
npm startents with student details
const payments = await Payment.find().populate('studentId');

// Get payments for a specific student
const studentPayments = await Payment.find({ 
  studentId: objectId 
}).sort({ paymentDate: -1 });
```

## Troubleshooting

### MongoDB Connection Error
**Problem**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
1. Verify MongoDB service is running
2. Check connection string in `.env`
3. Verify firewall/network settings
4. For Atlas, add your IP to whitelist

### Validation Error
**Problem**: `ValidationError: path required`

**Solution**:
- Ensure all required fields are provided
- Check field formats (email, numbers, etc.)
- Verify enum values match allowed options

### Duplicate Key Error
**Problem**: `MongoServerError: E11000 duplicate key error`

**Solution**:
- Check for unique constraints (admissionNumber, email, class name)
- Ensure no duplicate entries exist
- May need to rebuild indexes: `db.collection.deleteIndex("fieldName_1")`

### Database Already Exists
**Problem**: Collections created, but need to reset

**Solution**:
```bash
# In MongoDB shell or Atlas UI
use school_fees_db
db.dropDatabase()
```

## Monitoring and Tools

### MongoDB Shell (mongosh)
Access local database:
```bash
mongosh
use school_fees_db
db.students.find()
```

### MongoDB Compass (GUI)
- Download: https://www.mongodb.com/products/compass
- Visual database exploration and management
- Available for both local and Atlas databases

### Database Backup
Backup your data regularly:
```bash
# Local backup
mongodump --db school_fees_db --out /path/to/backup

# Restore from backup
mongorestore --db school_fees_db /path/to/backup/school_fees_db
```

## Performance Tips

1. **Indexing**: Already configured on Payment collection for `studentId` and `paymentDate`
2. **Pagination**: Can be added to GET endpoints for large datasets
3. **Connection Pooling**: Mongoose handles this automatically
4. **Query Optimization**: Use `.select()` to fetch only needed fields

## Migration from JSON Files

If migrating from JSON file storage:

```javascript
// Import data script
const fs = require('fs');
const Student = require('./models/Student');
const classData = JSON.parse(fs.readFileSync('./data/students.json'));

async function migrateData() {
  try {
    const count = await Student.insertMany(classData);
    console.log(`Migrated ${count.length} students`);
  } catch (error) {
    console.error('Migration error:', error);
  }
}
```

## Next Steps

1. ✅ Install MongoDB or create Atlas account
2. ✅ Set up `.env` file with MongoDB connection string
3. ✅ Run `npm install` to install dependencies
4. ✅ Start the server with `npm start`
5. ✅ Begin creating and managing data

---

For more information, visit:
- Mongoose Docs: https://mongoosejs.com/
- MongoDB Docs: https://docs.mongodb.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
