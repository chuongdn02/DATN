const express = require('express');
const { calculateKeto } = require('../controllers/healthController');

const router = express.Router();

router.post('/calculate', calculateKeto);

module.exports = router;
