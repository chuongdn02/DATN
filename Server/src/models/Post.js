const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
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
        enum: ['low', 'light', 'moderate', 'very-active']
    },
    goal: {
        type: String,
        required: true,
        enum: ['lose', 'gain', 'maintain']
    },
    time: {
        type: Date,
        default: Date.now 
    }
});

const commentSchema = new mongoose.Schema({
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
    comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
