// server.js

// Step 1: Import all necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Step 2: Load environment variables from .env file
dotenv.config();

// Step 3: Create an Express application
const app = express();

// Step 4: Add Middlewares
// Yeh server ko batata hai ki dusre origin se request accept karo
app.use(cors());
// Yeh server ko batata hai ki JSON format mein data ko samjho
app.use(express.json());

// Step 5: Get PORT and DB_URL from .env file
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// Check if DB_URL is loaded correctly
if (!DB_URL) {
  console.error("Error: DB_URL is not defined in the .env file.");
  process.exit(1); // Stop the application
}

// Step 6: Connect to the MongoDB database
mongoose.connect(DB_URL)
  .then(() => {
    console.log("✅ MongoDB database connected successfully!");

    // Step 8: Start the server only after the database connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
  });

// Step 7: Define API Routes
// Koi bhi request jo '/api/auth' se start hogi, woh 'routes/auth.js' file handle karegi
app.use('/api/auth', require('./routes/auth'));
// Aap yahan aur bhi routes add kar sakte hain
// app.use('/api/tasks', require('./routes/tasks'));

// Basic route to check if the server is alive
app.get('/', (req, res) => {
  res.send('🎉 Welcome to the API!');
});