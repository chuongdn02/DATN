const express = require('express');
const { calculateKeto } = require('../controllers/HealthController');

const router = express.Router();

router.post('/calculate', calculateKeto);

module.exports = router;
