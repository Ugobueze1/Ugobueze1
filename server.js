require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const studentRoutes = require('./routes/students');
const paymentRoutes = require('./routes/payments');
const classRoutes = require('./routes/classes');
const adminRoutes = require('./routes/admin');
const { Admin } = require('./models');

require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
  const username = process.env.DEFAULT_ADMIN_USERNAME || 'percy36';
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'percy36@example.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'umillion123';

  const existingAdmin = await Admin.findOne({ where: { username } });
  if (existingAdmin) {
    console.log(`✅ Admin already exists: ${username}`);
    return;
  }

  await Admin.create({ username, email, password });
  console.log(`✅ Admin created: ${username}`);
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    database: 'Connected',
    timestamp: new Date() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await createDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`\n✅ Server is running on http://localhost:${PORT}`);
      console.log(`📊 API Documentation:`);
      console.log(`   - Students: http://localhost:${PORT}/api/students`);
      console.log(`   - Payments: http://localhost:${PORT}/api/payments`);
      console.log(`   - Classes: http://localhost:${PORT}/api/classes`);
      console.log(`   - Admin: http://localhost:${PORT}/api/admin`);
      console.log(`   - Health: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
