const express = require('express');
const { calculateBMR } = require('../controllers/recordController');

const router = express.Router();

router.post('/calculate', calculateBMR);

module.exports = router;
