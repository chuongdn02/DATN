const express = require('express');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./src/routes/user');
const healthRoutes = require('./src/routes/health');
const chatbotRoutes = require('./src/routes/chatbotRoutes');
const recordRoutes = require('./src/routes/record');

// Load environment variables from .env file
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

dotenv.config();

const app = express();

require('./src/config/database');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

app.use('/auth', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api', chatbotRoutes);
app.use('/api', recordRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
