const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 5000;
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || origin === 'http://localhost:5173') {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));
app.use(express.json());

// MongoDB 
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Routes
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});