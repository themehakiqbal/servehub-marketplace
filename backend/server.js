const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); // ← ADD THIS

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // ← ADD THIS

// Test route
app.get('/', (req, res) => {
    res.send('🚀 ServeHub Marketplace API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});