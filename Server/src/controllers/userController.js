const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (userId, name, isChecked) => {
  return jwt.sign({ userId, name, isChecked }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const sendVerificationEmail = async (email, userId) => {
  try {
    const token = generateToken(userId);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Verify Your Email Address',
      html: `<p>Please click <a href="${process.env.CLIENT_URL}/auth/verify/${token}">here</a> to verify your email address.</p>`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error. Please try again later.');
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide all required fields: name, email, and password' });
  }

  try {
    let user = await User.findOne({email});

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: 1, 
      isVerified: false 
    });

    await user.save();

    try {
      await sendVerificationEmail(email, user._id);
      res.status(201).json({ msg: 'User registered successfully. Please check your email for verification.' });
    } catch (error) {
      console.error('Error sending verification email:', error);
      await User.findByIdAndDelete(user._id);
      return res.status(400).json({ msg: 'Failed to send verification email. Email address may not exist.' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Email address does not exist') {
      return res.status(400).json({ msg: 'Invalid email address' });
    } else {
      return res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide both email/phone and password' });
  }

  try {
    let user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or passwor' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: 'Please verify your email address before logging in' });
    }

    const token = generateToken(user._id, user.name, user.isChecked);
    return res.json({ token });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).send('Server error. Please try again later.');
  }
};

exports.verifyToken = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ msg: 'Email verified successfully' });
  }  catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addRecord = async (req, res) => {
  try {
      const { userId } = req.params;

      const { gender, activity_level, age, height, weight, goal, goal_weight,intensity } = req.body;
      console.log(req.body)

      if (!gender || !activity_level || !age || !height || !weight || !goal || !goal_weight) {
          return res.status(400).json({ message: 'All fields are required' });
      }
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'please login again'});
      }
      user.records.push({ gender, weight, height, age, activity_level, goal, goal_weight, intensity });
      user.isChecked = true;
      await user.save();

      res.status(200).json({ message: 'Health record added successfully', user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ records: user.records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllMeal = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }

    res.status(200).json({ meals: user.meals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addMeal = async (req, res) => {
  try {
    const { userId } = req.params;

    const { Name, Calories, Protein, Carbs, Fats, type, date , ration, quantity } = req.body;
    console.log(req.body);

    if (!Name || !Calories) {
      return res.status(400).json({ message: 'Name and Calories are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }
    user.meals.push({ Name, Calories, Protein, Carbs, Fats, type, date, ration, quantity});
    await user.save();
    res.status(200).json({ message: 'Meal added successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteMeal = async (req, res) => {
  try {
    const { userId, mealId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }

    // Find the meal and remove it from the meals array
    const mealIndex = user.meals.findIndex(meal => meal._id.toString() === mealId);
    if (mealIndex === -1) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    user.meals.splice(mealIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Meal deleted successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getYourFood = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }

    res.status(200).json({ yourFoods: user.yourFoods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addYourFood = async (req, res) => {
  try {
    const { userId } = req.params;

    const { Name, Calories, Protein, Carbs, Fats , ration, quantity } = req.body;
    console.log(req.body);

    if (!Name || !Calories) {
      return res.status(400).json({ message: 'Name and Calories are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }
    user.yourFoods.push({ Name, Calories, Protein, Carbs, Fats, ration, quantity});
    await user.save();
    res.status(200).json({ message: 'Meal added successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.editYourFood = async (req, res) => {
  try {
    const { userId, foodId } = req.params;
    const { Name, Calories, Protein, Carbs, Fats, ration, quantity } = req.body;

    if (!Name || !Calories) {
      return res.status(400).json({ message: 'Name and Calories are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }

    const foodItem = user.yourFoods.id(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    foodItem.Name = Name;
    foodItem.Calories = Calories;
    foodItem.Protein = Protein;
    foodItem.Carbs = Carbs;
    foodItem.Fats = Fats;
    foodItem.ration = ration;
    foodItem.quantity = quantity;

    await user.save();  

    res.status(200).json({ message: 'Food item updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteYourFood = async (req, res) => {
  try {
    const { userId, foodId } = req.params;
    console.log(req.params)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please login again.' });
    }

    const foodItem = user.yourFoods.id(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    foodItem.remove();
    await user.save();

    res.status(200).json({ message: 'Food item deleted successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
