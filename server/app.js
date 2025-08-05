
const express = require('express');
require('dotenv').config();




const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');

const orderRoutes = require('./routes/orderRoutes');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurants', menuRoutes);
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/orders', orderRoutes);



app.get('/', (req, res) => {
  res.send('Food Delivery API is running');
});






module.exports = app;