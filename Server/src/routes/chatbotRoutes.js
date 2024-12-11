const express = require('express');
const { getChatCompletion  } = require('../controllers/chatbotController');
const router = express.Router();

router.post('/chat', getChatCompletion);

module.exports = router;
