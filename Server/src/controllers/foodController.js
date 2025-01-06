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


const calculateMealNutrition = (meal) => {
    return meal.reduce((acc, food) => {
        acc.calories += food.Calories ? parseFloat(food.Calories) * food.quantity : 0;
        acc.carbs += food.Carbs ? food.Carbs * food.quantity : 0;
        acc.fats += food.Fats ? food.Fats * food.quantity : 0;
        acc.protein += food.Protein ? food.Protein * food.quantity : 0;
        return acc;
    }, { calories: 0, carbs: 0, fats: 0, protein: 0 });
};


exports.suggestMealPlan = async (req, res) => {
  try {
      const { calories, carbs, fats, protein } = req.body;
      const mealRatios = {
          breakfast: 0.25,
          lunch: 0.35,
          dinner: 0.25,
          snack: 0.15,
      };

      const meals = {};

      const calculateMealTarget = (ratio) => ({
          calories: calories * ratio,
          carbs: carbs * ratio,
          fats: fats * ratio,
          protein: protein * ratio,
      });

      const findFoodsForMeal = async (target, type) => {
          // Chỉ lấy các món ăn thuộc buổi hiện tại
          const foods = await Food.find({ Type: type });
          const result = [];
          let remaining = { ...target };

          // Sử dụng thuật toán Greedy kết hợp ngẫu nhiên
          while (remaining.calories > 0 && foods.length > 0) {
              let bestFood = null;
              let minDifference = Infinity;

              // Chọn món ăn ngẫu nhiên từ danh sách
              const randomFood = foods[Math.floor(Math.random() * foods.length)];

              for (const food of foods) {
                  const diff =
                      Math.abs(food.Calories - remaining.calories) +
                      Math.abs(food.Carbs - remaining.carbs) +
                      Math.abs(food.Fats - remaining.fats) +
                      Math.abs(food.Protein - remaining.protein);

                  if (diff < minDifference) {
                      minDifference = diff;
                      bestFood = food;
                  }
              }

              // Xác định món ăn được chọn (ngẫu nhiên hoặc tối ưu)
              const chosenFood = Math.random() < 0.4 ? randomFood : bestFood; // 40% khả năng chọn món ngẫu nhiên

              if (chosenFood) {
                  result.push(chosenFood);
                  remaining.calories -= chosenFood.Calories;
                  remaining.carbs -= chosenFood.Carbs;
                  remaining.fats -= chosenFood.Fats;
                  remaining.protein -= chosenFood.Protein;

                  // Xóa món ăn đã chọn khỏi danh sách để tránh chọn lặp lại
                  foods.splice(foods.indexOf(chosenFood), 1);
              } else {
                  break;
              }
          }

          return result;
      };

      // Tạo thực đơn cho từng buổi
      for (const [meal, ratio] of Object.entries(mealRatios)) {
          const target = calculateMealTarget(ratio);
          const foods = await findFoodsForMeal(target, meal); // Lọc món ăn theo `Type`
          meals[meal] = foods;
      }

      res.status(200).json({
          success: true,
          message: 'Meal suggestions generated successfully!',
          meals,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'An error occurred while generating meal suggestions.',
          error: error.message,
      });
  }
};
