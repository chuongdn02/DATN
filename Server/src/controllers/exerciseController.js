const Exercise = require('../models/Exercise')

exports.getAllExercises = async (req, res) => {
    try {
      const exercises = await Exercise.find();
      res.json(exercises);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error. Please try again later.');
    }
  };