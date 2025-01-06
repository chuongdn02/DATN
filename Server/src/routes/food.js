const express = require('express');
const {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
  suggestMealPlan,
} = require('../controllers/foodController'); // Đảm bảo bạn đã yêu cầu đúng controller

const router = express.Router();

router.get('/', getAllFoods);

router.post('/', createFood);

router.put('/:id', updateFood);

router.delete('/:id', deleteFood);

router.post('/suggest', suggestMealPlan);

module.exports = router;
