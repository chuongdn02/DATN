const mongoose = require('mongoose');


const exerciseSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
    },
    Calories: {
        type: Number,
        required: true,
    },
    Minutes: {
        type: Number,
    },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
