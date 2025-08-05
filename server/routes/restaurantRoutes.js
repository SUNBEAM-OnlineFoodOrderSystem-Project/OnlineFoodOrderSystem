const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Public route
router.get('/', restaurantController.getAllRestaurants);

// Route to get nearby restaurants
// This route expects latitude and longitude as query parameters
router.get('/nearby', restaurantController.getNearbyRestaurants);


// Route to get restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);


module.exports = router;
