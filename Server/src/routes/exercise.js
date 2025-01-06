const express = require('express');
const {
    getAllExercises,

} = require('../controllers/exerciseController'); // Đảm bảo bạn đã yêu cầu đúng controller

const router = express.Router();

router.get('/', getAllExercises);

module.exports = router;
