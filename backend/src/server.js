const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './src/.env' });

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin
const admin = require('./firebaseAdmin');

// Middleware
app.use(cors());
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

const commentRoutes = require('./routes/commentsRoutes');
app.use('/api/comments', commentRoutes);


// Simple API endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
