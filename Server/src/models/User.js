const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    activity_level: {
        type: String,
        required: true,
        enum: ['low', 'light', 'moderate', 'very_active']
    },
    goal: {
        type: String,
        required: true,
        enum: ['lose', 'gain', 'maintain']
    },
    goal_weight: {
        type: Number,
        required: true
    },
    intensity: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high']
    },
    time: {
        type: Date,
        default: Date.now 
    }
});
const mealSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Calories: {
        type: Number,
        required: true
    },
    Protein: {
        type: Number,
    },
    Carbs: {
        type: Number,
    },
    Fats: {
       type: Number,
    },
    type: {
        type: String,
    },
    date: {
        type: Date,
    },
    ration:{
        type: String,
    },
    quantity: {
       type: Number,
    }
});

const yourFoodSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Calories: {
        type: Number,
        required: true
    },
    Protein: {
        type: Number,
    },
    Carbs: {
        type: Number,
    },
    Fats: {
       type: Number,
    },
    ration:{
        type: String,
    },
    quantity: {
       type: Number,
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    records: [recordSchema],
    meals:[mealSchema],
    yourFoods: [yourFoodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
