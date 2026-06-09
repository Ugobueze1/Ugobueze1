# School Fees Management System

A complete full-stack web application for managing school student fees, payments, and financial records. Built with HTML5, CSS3, JavaScript for the frontend and Node.js/Express with MongoDB for the backend.

## Features

### Dashboard
- Overview of total students, expected fees, paid amounts, and outstanding balance
- Recent payments tracking
- Outstanding payments overview
- Visual statistics cards

### Student Management
- Add, edit, and delete students
- **Auto-generated admission numbers** (Format: ADM-YYYY-NNNN)
- Track student information (name, email, phone, admission number, class level)
- View fee status (pending, partial, paid)
- Search and filter by name, admission number, or class

### Payment Management
- Record payments from students
- Multiple payment methods (Bank Transfer, Card, Cash, Mobile Money)
- Payment history tracking
- Transaction ID management
- Filter payments by student or payment method

### Class Management
- Create and manage class levels
- Set annual fee amounts per class
- View total expected fees per class
- Edit and delete classes

### Financial Reports
- Comprehensive payment summary
- Fee collection status and rates
- Payment methods breakdown
- Student status overview
- Detailed student fee report
- Export reports to CSV
- Print functionality

## Project Structure

```
school fees platform/
├── backend/
│   ├── config/
│   │   └── database.js (MongoDB connection)
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── paymentController.js
│   │   └── classController.js
│   ├── models/
│   │   ├── Student.js (Mongoose schema)
│   │   ├── Payment.js (Mongoose schema)
│   │   └── Class.js (Mongoose schema)
│   ├── routes/
│   │   ├── students.js
│   │   ├── payments.js
│   │   └── classes.js
│   ├── server.js
│   ├── .env.example
│   ├── package.json
│   └── DATABASE_SETUP.md
│
└── frontend/
    ├── index.html (Dashboard)
    ├── pages/
    │   ├── students.html
    │   ├── payments.html
    │   ├── classes.html
    │   └── reports.html
    ├── css/
    │   └── styles.css
    └── js/
        ├── api.js
        ├── dashboard.js
        ├── students.js
        ├── payments.js
        ├── classes.js
        └── reports.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (Local or Atlas Cloud)
- A modern web browser

### Step 1: Database Setup

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free tier cluster
- Get your connection string

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/school_fees_db
PORT=5000
NODE_ENV=development
```

4. Install dependencies:
```bash
npm install
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open the frontend in a web browser:
   - Open `frontend/index.html` directly
   - Or use a local server (recommended):

```bash
# If you have Python 3
python -m http.server 8000

# Then visit http://localhost:8000/frontend/
```

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/admission/next` - Get next admission number to be generated
- `GET /api/students/admission/:admissionNumber` - Get student by admission number
- `GET /api/students/class/:classLevel` - Get students by class level
- `POST /api/students` - Create new student (admission number auto-generated if not provided; admin token required)
- `PUT /api/students/:id` - Update student (admin token required)
- `DELETE /api/students/:id` - Delete student (admin token required)

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/payments/student/:studentId` - Get payments for specific student
- `GET /api/payments/stats` - Get payment statistics
- `POST /api/payments` - Record new payment (admin token required)
- `DELETE /api/payments/:id` - Delete payment (admin token required)

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/name/:name` - Get class by name
- `POST /api/classes` - Create new class (admin token required)
- `PUT /api/classes/:id` - Update class (admin token required)
- `DELETE /api/classes/:id` - Delete class (admin token required)

### Admin
- `POST /api/admin/register` - Register a new admin user
- `POST /api/admin/login` - Admin login, returns JWT token
- `GET /api/admin/profile` - Get authenticated admin profile (admin token required)

## Database Schema

- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/payments/student/:studentId` - Get payments for specific student
- `GET /api/payments/stats` - Get payment statistics
- `POST /api/payments` - Record new payment
- `DELETE /api/payments/:id` - Delete payment (reverses payment)

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/name/:name` - Get class by name
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

## Database Schema

### Student Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  classLevel: String (required),
  admissionNumber: String (required, unique),
  feeAmount: Number (required),
  totalPaid: Number (default: 0),
  status: 'pending' | 'partial' | 'paid',
  createdAt: Date,
  lastUpdated: Date
}
```

### Payment Model
```javascript
{
  studentId: ObjectId (ref: Student),
  amount: Number (required),
  paymentMethod: 'bank_transfer' | 'card' | 'cash' | 'mobile_money',
  transactionId: String,
  status: 'pending' | 'completed' | 'failed',
  paymentDate: Date,
  remarks: String
}
```

### Class Model
```javascript
{
  name: String (required, unique),
  feeAmount: Number (required),
  numberOfStudents: Number (default: 0),
  createdAt: Date
}
```

## Usage

1. **Add a Class**: Navigate to Classes → Click "Add New Class" → Fill in details
2. **Add a Student**: Go to Students → Click "Add New Student" → Fill in information
3. **Record Payment**: Go to Payments → Click "Record Payment" → Select student and enter amount
4. **View Reports**: Navigate to Reports to see financial summary and detailed reports
5. **Export Data**: In Reports page, use "Export as CSV" button

## Features & Highlights

✅ **Auto-Generated Admission Numbers** - Sequential format: ADM-YYYY-NNNN (e.g., ADM-2024-0001)
✅ **MongoDB Integration** - Persistent data with proper database management
✅ **Data Validation** - Server-side and client-side validation
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
✅ **Real-time Updates** - Data updates immediately after actions
✅ **Search & Filter** - Quick search and filter capabilities
✅ **Statistical Dashboard** - Key metrics at a glance
✅ **Payment Tracking** - Complete payment history
✅ **Comprehensive Reports** - Financial insights and analysis
✅ **Export Functionality** - Generate CSV reports
✅ **User-friendly Interface** - Intuitive navigation and design
✅ **Error Handling** - Graceful error messages
✅ **Auto-timestamps** - Automatic creation and update timestamps

## Technology Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

**Backend:**
- Node.js
- Express.js
- MongoDB (NoSQL Database)
- Mongoose (ODM - Object Data Modeling)
- UUID for unique IDs

## Database Features

- **Schema Validation**: All fields validated at database level
- **Relationships**: Proper referencing between collections
- **Indexes**: Optimized queries for performance
- **Methods**: Built-in helper methods for common operations
- **Hooks**: Pre-save hooks for automatic updates

## Next Steps

1. ✅ Set up MongoDB locally or in cloud
2. ✅ Configure `.env` file
3. ✅ Install backend dependencies
4. ✅ Start the server
5. ✅ Open frontend in browser
6. ✅ Create classes and students
7. ✅ Record payments
8. ✅ Generate reports

## Future Enhancements

- User authentication and authorization
- Email notifications for payment reminders
- SMS integration
- Advanced reporting with charts
- Bulk import/export functionality
- Payment plans and installments
- Late fee calculations
- Parent/guardian portal
- Mobile app

## Troubleshooting

### MongoDB Connection Issues
```
Error: Cannot connect to MongoDB
```
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify network connectivity
- For Atlas, add IP to whitelist

### Port Already in Use
If port 5000 is in use, modify `.env`:
```env
PORT=5001
```

### CORS Errors
The backend has CORS enabled. If issues persist:
1. Check browser console for detailed error
2. Verify backend is running
3. Confirm frontend API URL: `http://localhost:5000/api`

### Database Not Persisting Data
- Verify MongoDB is running
- Check connection string is correct
- Ensure database has write permissions

## Available npm Scripts

- `npm start` - Start the production server
- `npm run dev` - Start with nodemon (auto-reload)

## Documentation

- [DATABASE_SETUP.md](backend/DATABASE_SETUP.md) - Detailed database setup guide
- [GETTING_STARTED.md](GETTING_STARTED.md) - Quick start guide

## Support

For issues or questions:
1. Check console errors (DevTools F12)
2. Review server terminal output
3. Verify MongoDB connection
4. Check API URL configuration

## License

MIT License - Feel free to use this project for educational purposes.

---

**Created:** 2024
**Last Updated:** 2024
**Database:** MongoDB with Mongoose
