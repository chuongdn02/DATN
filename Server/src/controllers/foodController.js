const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
    try {
      const foods = await Food.find();
      res.json(foods);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error. Please try again later.');
    }
  };

  exports.createFood = async (req, res) => {
    const { name, calories, protein, carbs, fats, ration, type } = req.body;
  
    try {
      const newFood = new Food({
        Name: name,
        calories,
        protein,
        carbs,
        fats,
        ration,
        type
      });
  
      await newFood.save();
  
      res.status(201).json(newFood);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error. Please try again later.');
    }
  };

  exports.updateFood = async (req, res) => {
    const { name, calories, protein, carbs, fats, ration, type } = req.body;
  
    try {
      let food = await Food.findById(req.params.id);
  
      if (!food) {
        return res.status(404).json({ msg: 'Food not found' });
      }
  
      // Cập nhật thông tin món ăn
      food.Name = name || food.Name;
      food.calories = calories || food.calories;
      food.protein = protein || food.protein;
      food.carbs = carbs || food.carbs;
      food.fats = fats || food.fats;
      food.ration = ration || food.ration;
      food.type = type || food.type;
  
      await food.save();
  
      res.json(food);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error. Please try again later.');
    }
  };
  exports.deleteFood = async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
  
      if (!food) {
        return res.status(404).json({ msg: 'Food not found' });
      }
  
      await food.remove();
  
      res.json({ msg: 'Food deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error. Please try again later.');
    }
  };
    