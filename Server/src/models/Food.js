const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Calories: {
        type: String,
        required: true,
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
    Ration: {
        type: String,
    },
    Type: {
        type: String,
    },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
