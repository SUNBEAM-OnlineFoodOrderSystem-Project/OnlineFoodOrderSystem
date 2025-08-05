const restaurantModel = require('../models/restaurantModel');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.getAllRestaurants();
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};











exports.getNearbyRestaurants = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const radius = req.query.radius || 5; // Default radius of 5 km

  restaurantModel.getNearbyRestaurants(parseFloat(latitude), parseFloat(longitude), parseFloat(radius), (err, restaurants) => {
    console.log('Received request for /restaurants/nearby');
    if (err) {
      
      console.error('Error fetching nearby restaurants:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    

    res.status(200).json({ restaurants });
  });
};