const express = require('express');
const { registerUser, loginUser ,getAllUsers ,verifyToken, addRecord, getAllRecords, addMeal, getYourFood, getAllMeal, addYourFood, editYourFood, deleteYourFood, deleteMeal} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', getAllUsers);

router.get('/verify/:token', verifyToken);

router.post('/users/:userId/record', addRecord);

router.get('/users/:userId/records', getAllRecords);

router.post('/users/:userId/addMeal', addMeal);

router.get('/users/:userId/meals', getAllMeal);

router.delete('/users/:userId/meals/:mealId', deleteMeal);

router.get('/users/:userId/yourFoods', getYourFood);

router.post('/users/:userId/addYourFood', addYourFood);

router.put('/users/:userId/yourFoods/:foodId', editYourFood);

router.delete('/users/:userId/yourFoods/:foodId', deleteYourFood);



module.exports = router;
