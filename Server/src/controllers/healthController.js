const User = require('../models/User');
require('dotenv').config();
// Công thức Mifflin-St Jeor
function calculateBMR(gender, weight, height, age) {
    if (gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return 0;
}

// Tính toán lượng calo hàng ngày dựa trên mức độ hoạt động
function calculateDailyCalories(bmr, activityLevel) {
    const activityFactors = {
        'sedentary': 1.2,
        'lightly_active': 1.375,
        'moderately_active': 1.55,
        'very_active': 1.725,
        'super_active': 1.9
    };
    return bmr * (activityFactors[activityLevel] || 1.2);
}

// Tính toán lượng calo để tăng hoặc giảm cân
function calculateCaloriesForGoal(dailyCalories, goal) {
    const calorieDeficitOrSurplus = 500; // Khoảng 500 calo/ngày để giảm hoặc tăng 0.5 kg/tuần
    if (goal === 'lose') {
        return dailyCalories - calorieDeficitOrSurplus;
    } else if (goal === 'gain') {
        return dailyCalories + calorieDeficitOrSurplus;
    }
    return dailyCalories;
}

exports.calculateKeto = async (req, res) => {
    const { _id } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user || !user.health) {
            return res.status(404).json({ msg: 'User or health information not found' });
        }

        const { gender, weight, height, age, activityLevel, goal } = user.health;

        // Tính BMR
        const bmr = calculateBMR(gender, weight, height, age);

        // Tính lượng calo hàng ngày
        const dailyCalories = calculateDailyCalories(bmr, activityLevel);

        // Tính lượng calo để tăng hoặc giảm cân
        const targetCalories = calculateCaloriesForGoal(dailyCalories, goal);

        res.json({
            bmr: bmr,
            dailyCalories: dailyCalories,
            targetCalories: targetCalories
        });
    } catch (error) {
        console.error('Error calculating calories:', error.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
};
