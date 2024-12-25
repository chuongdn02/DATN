const User = require('../models/User'); // Import User model
require('dotenv').config();

exports.calculateBMR = async (req, res) => {
    try {
        const { user_id } = req.body;
      

        if (!user_id) {
            return res.status(400).json({ error: 'Missing user_id field.' });
        }
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const latestRecord = user.records.slice(-1)[0];
        if (!latestRecord) {
            return res.status(400).json({ error: 'No records found for this user.' });
        }

        const { weight, height, age, gender, activity_level, goal, intensity } = latestRecord;

        if (!weight || !height || !age || !gender || !activity_level) {
            return res.status(400).json({ error: 'Incomplete record data for BMR calculation.' });
        }

        // Tính BMR theo công thức Harris-Benedict
        let bmr = 0;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'female') {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            return res.status(400).json({ error: 'Invalid gender value.' });
        }

        const activityMultiplier = {
            low: 1.2,
            light: 1.375,
            moderate: 1.55,
            very_active: 1.725,
        };

        const multiplier = activityMultiplier[activity_level];
        if (!multiplier) {
            return res.status(400).json({ error: 'Invalid activity_level value.' });
        }

        const adjustedBMR = bmr * multiplier;
        let BMR = adjustedBMR;
        let carbRatio = 0.5; // Default
        let proteinRatio = 0.3; // Default
        let fatRatio = 0.2; // Default

        // Tính BMR theo mục tiêu
        if (goal === 'maintain') {
            // BMR giữ nguyên, tỷ lệ mặc định
        } else if (goal === 'lose') {
            carbRatio = 0.45;
            proteinRatio = 0.35;
            fatRatio = 0.2;

            if (intensity === 'low') {
                BMR -= 1100 * 0.25;
            } else if (intensity === 'medium') {
                BMR -= 1100 * 0.5;
            } else {
                BMR -= 1100;
            }
        } else if (goal === 'gain') {
            carbRatio = 0.55;
            proteinRatio = 0.2;
            fatRatio = 0.25;

            if (intensity === 'low') {
                BMR += 1100 * 0.25;
            } else if (intensity === 'medium') {
                BMR += 1100 * 0.5;
            } else {
                BMR += 1100;
            }
        }

        // Tính macros
        const carbs = (BMR * carbRatio) / 4; // Carbs (gram)
        const protein = (BMR * proteinRatio) / 4; // Protein (gram)
        const fat = (BMR * fatRatio) / 9; // Fat (gram)

        res.status(200).json({
            calories: parseFloat(BMR.toFixed(0)),
            carbs: parseFloat(carbs.toFixed(0)),
            protein: parseFloat(protein.toFixed(0)),
            fat: parseFloat(fat.toFixed(0)),
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
