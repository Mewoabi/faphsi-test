require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Use the FRONTEND_URL from .env
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Include custom headers
  credentials: true, // Allow cookies or credentials if needed
}));
app.use(bodyParser.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
