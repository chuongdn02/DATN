const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
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
    activityLevel: {
        type: String,
        required: true,
        enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'super_active']
    },
    goal: {
        type: String,
        required: true,
        enum: ['lose', 'gain', 'maintain']
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
    health: healthSchema 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
