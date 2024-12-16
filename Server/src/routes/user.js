const express = require('express');
const { registerUser, loginUser ,getAllUsers ,verifyToken, addRecord} = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

router.get('/', getAllUsers);

router.get('/verify/:token', verifyToken);

router.post('/users/:userId/record', addRecord);

module.exports = router;
