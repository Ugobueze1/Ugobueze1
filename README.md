# Payroll Generator Portal

A complete payroll generation app and admin portal built with HTML, CSS, JavaScript, and Node.js/Express.

## Features

- Admin login and dashboard
- Employee management (add, edit, delete)
- Payroll run generation based on salary, bonuses, deductions, and tax rates
- Payslip preview and payroll history
- JSON-backed backend storage for easy local setup

## Project Structure

```
payroll-generator-portal/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── payrollController.js
│   ├── data/
│   │   ├── employees.json
│   │   └── payrolls.json
│   ├── models/
│   │   ├── employee.js
│   │   └── payroll.js
│   ├── routes/
│   │   └── payroll.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── api.js
    │   ├── auth.js
    │   └── dashboard.js
    ├── admin.html
    └── index.html
```

## Installation

1. Open a terminal in `payroll-generator-portal/backend`
2. Run:

```bash
npm install
```

## Run the App

From `payroll-generator-portal/backend`:

```bash
npm start
```

Then open `payroll-generator-portal/frontend/index.html` in your browser.

## Admin Login

Use the default admin credentials in the portal:

- Email: `admin@payroll.com`
- Password: `admin123`
