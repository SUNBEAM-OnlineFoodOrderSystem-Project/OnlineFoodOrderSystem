const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = async (req, res) => {
  const { full_name, email, phone_number, password } = req.body;
  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role_id = 2; // Assuming 2 = Customer

    const userId = await userModel.createUser({
      full_name,
      email,
      phone_number,
      password: hashedPassword,
      role_id,
    });

    const token = jwt.sign({ id: userId, role_id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
