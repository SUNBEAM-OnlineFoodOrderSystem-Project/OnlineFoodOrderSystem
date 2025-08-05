const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/restaurants/:id/menu
router.get('/:id/menu', menuController.getMenuByRestaurantId);

module.exports = router;
