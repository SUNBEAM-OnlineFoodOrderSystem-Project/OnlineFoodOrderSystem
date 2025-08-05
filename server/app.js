
const express = require('express');
require('dotenv').config();



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.send('Food Delivery API is running');
});



module.exports = app;