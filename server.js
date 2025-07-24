const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();
const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://velvety-nougat-6393da.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

app.use('/api/job', require('./routes/job'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/user', require('./routes/user'));

app.get('/', (req, res) => {
  res.send('Job Portal API is running...');
});

// ✅ Handle preflight requests
app.options('*', cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
